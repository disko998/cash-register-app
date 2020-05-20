import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Colors from '../constants/Colors'
import { formatMoney } from '../utils/helpers'
import { AppContext } from '../context/AppProvider'

export default function Customer({ bg, title, id, price, index }) {
    const { navigate } = useNavigation()
    const {
        actions: { removeCustomer },
    } = React.useContext(AppContext)

    const onPress = () => {
        navigate('cart', { id })
    }

    const onRemove = () => {
        removeCustomer(id)
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.wrapper, { backgroundColor: bg }]}
        >
            <Text style={styles.title}>{`${title}\n#${index + 1}`}</Text>
            <Text style={styles.price}>{formatMoney(price)} din</Text>
            <TouchableOpacity onPress={onRemove}>
                <AntDesign name='close' size={30} color={Colors.white} />
            </TouchableOpacity>
        </TouchableOpacity>
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
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
    },
    price: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.white,
        flex: 1,
    },
})
