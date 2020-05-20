import React from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Keyboard,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Colors from '../constants/Colors'
import { AppContext } from '../context/AppProvider'
import { formatMoney } from '../utils/helpers'

export default function CartItem({ itemId, bg, cost, recorded, id }) {
    const {
        actions: { addItem, removeItem },
    } = React.useContext(AppContext)
    const [itemCost, setItemCost] = React.useState('')

    const onChange = value => {
        setItemCost(value)
    }
    const onPress = () => {
        recorded ? removeItem(id, itemId) : addItem(id, itemCost)
        setItemCost('')
        Keyboard.dismiss()
    }

    return (
        <View style={[styles.wrapper, { backgroundColor: bg }]}>
            <FontAwesome
                name={recorded ? 'opencart' : 'cart-plus'}
                size={30}
                color={Colors.white}
            />
            {recorded ? (
                <Text style={styles.itemCost}>
                    Cena: {formatMoney(cost)} din
                </Text>
            ) : (
                <TextInput
                    style={styles.input}
                    value={itemCost}
                    onChangeText={onChange}
                    placeholder='Unesite cenu proizvoda'
                    keyboardType='number-pad'
                    onSubmitEditing={onPress}
                    autoFocus={true}
                />
            )}
            <TouchableOpacity onPress={onPress}>
                <AntDesign
                    name={recorded ? 'close' : 'check'}
                    size={30}
                    color={Colors.white}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 10,
        margin: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        flexDirection: 'row',
        minHeight: 70,
    },
    input: {
        backgroundColor: Colors.background,
        borderRadius: 15,
        flex: 1,
        marginHorizontal: 15,
        padding: 10,
    },
    itemCost: {
        flex: 1,
        textAlign: 'center',
        fontSize: 25,
        color: Colors.white,
    },
})
