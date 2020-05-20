import * as React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import LinksScreen from '../screens/LinksScreen'
import HomeStack from './HomeStack'
import { Routes } from '../constants/Strings'
import Colors from '../constants/Colors'

const BottomTab = createMaterialBottomTabNavigator()

export default function BottomTabNavigator({ navigation, route }) {
    console.log(route)
    return (
        <BottomTab.Navigator
            initialRouteName={Routes.DASHBOARD}
            shifting={true}
            activeColor={Colors.tintActive}
            inactiveColor={Colors.tintInactive}
            keyboardHidesNavigationBar={true}
        >
            <BottomTab.Screen
                name={Routes.DASHBOARD}
                component={HomeStack}
                options={{
                    tabBarColor: Colors.tintColorPrimary,
                    tabBarLabel: 'Kasa',
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialCommunityIcons
                            name='cash-register'
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name='Links'
                component={LinksScreen}
                options={{
                    tabBarColor: Colors.tintColorSecondary,
                    tabBarLabel: 'Postavke',
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialCommunityIcons
                            name='settings'
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}
