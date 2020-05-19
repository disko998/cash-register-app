import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import Colors from '../constants/Colors'
import Customer from '../components/Customer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppContext } from '../context/AppProvider'

const DATA = [
    {
        id: '1',
        title: 'Kupac',
        price: 230,
        bg: Colors.customer[0],
    },
    {
        id: '2',
        title: 'Kupac',
        price: 650.32,
        bg: Colors.customer[1],
    },
    {
        id: '3',
        title: 'Kupac',
        price: 350,
        bg: Colors.customer[2],
    },
]

export default function HomeScreen() {
    const { data, actions } = React.useContext(AppContext)

    return (
        <View style={styles.container}>
            <FlatList
                data={data.customers}
                renderItem={({ item }) => <Customer {...item} />}
                keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity style={styles.fab} onPress={actions.addCustomer}>
                <Feather name='plus' size={30} color={Colors.white} />
            </TouchableOpacity>
        </View>
    )
}

HomeScreen.navigationOptions = {
    header: null,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 15,
    },
    fab: {
        borderRadius: 50,
        backgroundColor: Colors.main,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
    },
})
