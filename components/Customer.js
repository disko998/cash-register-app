import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Colors from '../constants/Colors'

export default function Customer({ bg, title, id, price }) {
    const { navigate } = useNavigation()

    const onPress = () => {
        navigate('cart', { bg, title, id, price })
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.wrapper, { backgroundColor: bg }]}
        >
            <Text style={styles.title}>{`${title}\n#${id}`}</Text>
            <Text style={styles.price}>{price} din</Text>
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
