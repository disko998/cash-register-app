import React from 'react'
import { View, FlatList, StatusBar, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import CartItem from '../components/CartItem'
import Colors from '../constants/Colors'

export default function CartScreen({ route }) {
    const navigation = useNavigation()
    const data = route.params

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: `Cena: ${data.price} din`,
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: data.bg },
            headerTitleStyle: { color: Colors.white },
            headerTintColor: Colors.white,
        })
    }, [data])

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={data.bg} />
            <FlatList
                data={data.items}
                renderItem={({ item }) => (
                    <CartItem {...item} {...data} recorded />
                )}
                keyExtractor={item => item.cost.toString()}
                ListFooterComponent={<CartItem {...data} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 15,
    },
})
