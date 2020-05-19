import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import Colors from '../constants/Colors'
import Customer from '../components/Customer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppContext } from '../context/AppProvider'

export default function HomeScreen({ navigation }) {
    navigation.setOptions({
        headerTitle: 'Disko Zimnica Kasa',
        headerTitleAlign: 'center',
    })
    const { data, actions } = React.useContext(AppContext)

    return (
        <View style={styles.container}>
            <FlatList
                data={data.customers}
                renderItem={({ item }) => <Customer {...item} />}
                keyExtractor={item => item.id.toString()}
            />
            <View style={styles.fab}>
                <TouchableOpacity onPress={actions.addCustomer}>
                    <Feather name='plus' size={30} color={Colors.white} />
                </TouchableOpacity>
            </View>
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
        zIndex: 99,
        position: 'absolute',
        bottom: 20,
        right: 20,
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
