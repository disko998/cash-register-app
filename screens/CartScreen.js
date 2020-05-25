import React from 'react'
import {
    View,
    StatusBar,
    StyleSheet,
    FlatList,
    Platform,
    Alert,
} from 'react-native'

import ItemCard from '../components/ItemCard'
import Colors from '../constants/Colors'
import { AppContext } from '../context/AppProvider'
import { formatMoney } from '../utils/helpers'
import InputForm from '../components/InputForm'
import BillModal from '../components/BillModal'

export default function CartScreen({ route, navigation }) {
    const {
        data: { customers },
        actions: { addItem, removeItem, checkout, validateCheckoutAmount },
    } = React.useContext(AppContext)

    const [itemPrice, setItemPrice] = React.useState('')
    const [payedAmount, setPayedAmount] = React.useState('')
    const [visible, setVisible] = React.useState(false)

    const itemPriceRef = React.useRef()
    const payedInputRef = React.useRef()

    const { id } = route.params
    const data = { ...customers[id], id }

    navigation.setOptions({
        headerTitle: `Ukupno: ${formatMoney(data.price)} din`,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: data.bg },
        headerTitleStyle: { color: Colors.white },
        headerTintColor: Colors.white,
    })

    const onAddItem = () => {
        addItem(id, itemPrice)
        setItemPrice('')
        itemPriceRef && itemPriceRef.current.focus()
    }

    const onCheckout = () => {
        checkout(data, payedAmount)
        navigation.goBack()
    }

    const focusPayInput = () => {
        payedInputRef && payedInputRef.current.focus()
    }

    const toggleOverlay = () => {
        setVisible(!visible)
    }

    const onBill = () => {
        if (validateCheckoutAmount(payedAmount, data.price)) {
            toggleOverlay()
        } else {
            Alert.alert('Ops', `Nemate dovoljno novca za ovu kupovinu`)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={data.bg}
                animated={true}
            />

            <InputForm
                ref={itemPriceRef}
                title='Dodaj'
                value={itemPrice}
                onChangeText={setItemPrice}
                placeholder='Cena proizvoda'
                onSubmit={onAddItem}
                autoFocus={true}
                returnKeyType='next'
                returnKeyLabel='plati'
                onSubmitEditing={
                    Platform.OS === 'web' ? onAddItem : focusPayInput
                }
            />

            <FlatList
                keyboardShouldPersistTaps='always'
                data={data.items}
                style={{ flex: 1 }}
                renderItem={({ item, index }) => (
                    <ItemCard
                        bg={data.bg}
                        text={item.cost}
                        index={data.items.length - index - 1}
                        title='Artikal'
                        onRemove={() => removeItem(id, item.id)}
                    />
                )}
                keyExtractor={item => item.id}
            />

            <InputForm
                ref={payedInputRef}
                title='Racun'
                value={payedAmount}
                onChangeText={setPayedAmount}
                placeholder={`Racun: ${formatMoney(data.price)} din`}
                onSubmitEditing={onBill}
                onSubmit={onBill}
                top
            />

            <BillModal
                visible={visible}
                toggleOverlay={toggleOverlay}
                data={data}
                payed={payedAmount}
                onPress={onCheckout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10,
    },
})
