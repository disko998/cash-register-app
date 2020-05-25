import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import MenuScreen from '../screens/MenuScreen'
import { Routes } from '../constants/Strings'
import { AppContext } from '../context/AppProvider'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export function HomeStack() {
    return (
        <Stack.Navigator initialRouteName={Routes.MAIN}>
            <Stack.Screen name={Routes.MAIN} component={HomeScreen} />
            <Stack.Screen name={Routes.CART} component={CartScreen} />
        </Stack.Navigator>
    )
}

export default function Navigation() {
    const {
        actions: { calculateEarnings },
    } = React.useContext(AppContext)

    return (
        <Drawer.Navigator
            initialRouteName={Routes.ROOT}
            drawerContent={props => (
                <MenuScreen
                    {...props}
                    earned={calculateEarnings()}
                    week={calculateEarnings('week')}
                    month={calculateEarnings('month')}
                    day={calculateEarnings('day')}
                />
            )}
            drawerContentOptions
        >
            <Drawer.Screen name={Routes.ROOT} component={HomeStack} />
        </Drawer.Navigator>
    )
}
