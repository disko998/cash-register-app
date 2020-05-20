import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'

import useCachedResources from './hooks/useCachedResources'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import AppProvider from './context/AppProvider'
import { Routes } from './constants/Strings'
import Colors from './constants/Colors'

const Stack = createStackNavigator()

export default function App(props) {
    const isLoadingComplete = useCachedResources()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='dark-light'
                    backgroundColor={Colors.mainDark}
                />

                <AppProvider>
                    <NavigationContainer linking={LinkingConfiguration}>
                        <Stack.Navigator headerMode='none'>
                            <Stack.Screen
                                name={Routes.ROOT}
                                component={BottomTabNavigator}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </AppProvider>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})
