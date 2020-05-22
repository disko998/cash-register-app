import React from 'react'
import { View, StatusBar, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ItemCard from '../components/ItemCard'
import Colors from '../constants/Colors'
import { AppContext } from '../context/AppProvider'
import { formatMoney } from '../utils/helpers'
import InputForm from '../components/InputForm'
import { Platform } from 'react-native'

export default function CartScreen({ route }) {
    const {
        data: { customers },
        actions: { addItem, removeItem },
    } = React.useContext(AppContext)
    const [itemPrice, setItemPrice] = React.useState('')
    const [customerPay, setCustomerPay] = React.useState('')
    const itemPriceRef = React.useRef()
    const payInputRef = React.useRef()
    const navigation = useNavigation()

    const { id } = route.params
    const data = customers[id]

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

    const focusPayInput = () => {
        payInputRef && payInputRef.current.focus()
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
                title='Plati'
                value={customerPay}
                onChangeText={setCustomerPay}
                placeholder={`Plati: ${formatMoney(data.price)} din`}
                onSubmitEditing={() => {}}
                onPress={() => {}}
                top
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
