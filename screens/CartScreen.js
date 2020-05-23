import React from 'react'
import { View, StatusBar, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ItemCard from '../components/ItemCard'
import Colors from '../constants/Colors'
import { Routes } from '../constants/Strings'
import { AppContext } from '../context/AppProvider'
import { formatMoney } from '../utils/helpers'
import InputForm from '../components/InputForm'
import { Platform } from 'react-native'
import BillModal from '../components/BillModal'

export default function CartScreen({ route, navigation }) {
    const {
        data: { customers },
        actions: { addItem, removeItem, checkout },
    } = React.useContext(AppContext)
    const [itemPrice, setItemPrice] = React.useState('')
    const [customerPay, setCustomerPay] = React.useState('')
    const [visible, setVisible] = React.useState(false)
    const itemPriceRef = React.useRef()
    const payInputRef = React.useRef()

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
        navigation.goBack()
        checkout(data)
    }

    const focusPayInput = () => {
        payInputRef && payInputRef.current.focus()
    }

    const toggleOverlay = () => {
        setVisible(!visible)
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
                ref={payInputRef}
                title='Racun'
                value={customerPay}
                onChangeText={setCustomerPay}
                placeholder={`Racun: ${formatMoney(data.price)} din`}
                onSubmitEditing={toggleOverlay}
                onSubmit={toggleOverlay}
                top
            />

            <BillModal
                visible={visible}
                toggleOverlay={toggleOverlay}
                data={data}
                payed={customerPay}
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
