import * as React from 'react'
import { StyleSheet, FlatList, View, Platform } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
            headerRight: () => (
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={navigation.openDrawer}
                    hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                >
                    <MaterialCommunityIcons
                        name='dots-vertical'
                        size={30}
                        color={Colors.white}
                    />
                </TouchableOpacity>
            ),
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
                contentContainerStyle={
                    Platform.OS === 'web' ? styles.webContainerStyle : null
                }
                keyExtractor={item => item.id.toString()}
            />
            <View style={styles.absoluteView}>
                <TouchableOpacity style={styles.fab} onPress={addCustomer}>
                    <FontAwesome5
                        name='cash-register'
                        size={25}
                        color={Colors.white}
                    />
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
    webContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
    },
    menuButton: {
        marginRight: 20,
    },
})
