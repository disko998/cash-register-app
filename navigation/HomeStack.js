import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import { Routes } from '../constants/Strings'

const Stack = createStackNavigator()

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName={Routes.MAIN}>
            <Stack.Screen name={Routes.MAIN} component={HomeScreen} />
            <Stack.Screen name={Routes.CART} component={CartScreen} />
        </Stack.Navigator>
    )
}
