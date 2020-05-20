import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import Colors from '../constants/Colors'
import Customer from '../components/Customer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppContext } from '../context/AppProvider'

export default function HomeScreen({ navigation }) {
    const { data, actions } = React.useContext(AppContext)

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Moja Kasa',
            headerTitleAlign: 'center',
        })
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={actions.objToArray(data.customers)}
                renderItem={({ item, index }) => (
                    <Customer {...item} index={index} />
                )}
                keyExtractor={item => item.id.toString()}
            />
            <View style={styles.absoluteView}>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={actions.addCustomer}
                >
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
        padding: 10,
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
    absoluteView: {
        zIndex: 99,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
})
