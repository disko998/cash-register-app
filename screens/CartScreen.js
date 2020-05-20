import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

import CartItem from '../components/CartItem'
import Colors from '../constants/Colors'
import { AppContext } from '../context/AppProvider'
import { formatMoney } from '../utils/helpers'

export default function CartScreen({ route }) {
    const {
        data: { customers },
    } = React.useContext(AppContext)
    const navigation = useNavigation()

    const { id } = route.params
    const data = customers[id]

    navigation.setOptions({
        headerTitle: `Ukupna cena: ${formatMoney(data.price)} din`,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: data.bg },
        headerTitleStyle: { color: Colors.white },
        headerTintColor: Colors.white,
    })

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={data.bg} />

            <KeyboardAwareFlatList
                keyboardShouldPersistTaps='always'
                data={data.items}
                renderItem={({ item }) => (
                    <CartItem
                        {...item}
                        {...data}
                        id={id}
                        itemId={item.id}
                        recorded
                    />
                )}
                keyExtractor={item => item.id}
                ListFooterComponent={<CartItem {...data} id={id} />}
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
