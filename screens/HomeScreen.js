import * as React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import Colors from '../constants/Colors'
import { Routes } from '../constants/Strings'
import ItemCard from '../components/ItemCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppContext } from '../context/AppProvider'

export default function HomeScreen({ navigation }) {
    const {
        data: { customers },
        actions: { removeCustomer, addCustomer, objToArray },
    } = React.useContext(AppContext)

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Moja Kasa',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: Colors.main },
            headerTitleStyle: { color: Colors.white },
        })
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={objToArray(customers).filter(c => !c.checkout)}
                renderItem={({ item, index }) => (
                    <ItemCard
                        title={item.title}
                        bg={item.bg}
                        text={item.price}
                        onRemove={() => removeCustomer(item.id)}
                        onPress={() =>
                            navigation.navigate(Routes.CART, { id: item.id })
                        }
                        index={index}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
            <View style={styles.absoluteView}>
                <TouchableOpacity style={styles.fab} onPress={addCustomer}>
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
