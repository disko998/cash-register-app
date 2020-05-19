import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import TabBarIcon from '../components/TabBarIcon'
import LinksScreen from '../screens/LinksScreen'
import HomeStack from './HomeStack'
import { Routes } from '../constants/Strings'

const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator({ navigation, route }) {
    return (
        <BottomTab.Navigator initialRouteName={Routes.DASHBOARD}>
            <BottomTab.Screen
                name={Routes.DASHBOARD}
                component={HomeStack}
                options={{
                    title: 'Get Started',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name='md-code-working' />
                    ),
                }}
            />
            <BottomTab.Screen
                name='Links'
                component={LinksScreen}
                options={{
                    title: 'Resources',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name='md-book' />
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}
