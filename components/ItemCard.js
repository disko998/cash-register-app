import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions,
    Platform,
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { formatMoney } from '../utils/helpers'

const width = Dimensions.get('window').width

export default function ItemCard({
    bg,
    title,
    text,
    index,
    onRemove,
    onPress,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!onPress}
            style={[styles.wrapper, { backgroundColor: bg }]}
        >
            <Text style={styles.title}>{`${title}\n#${index + 1}`}</Text>
            <Text style={styles.price}>{formatMoney(text)} din</Text>
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
        padding: 10,
        flexDirection: 'row',
        width: Platform.OS === 'web' ? width * 0.5 : 'auto',
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
