import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar, StyleSheet, View } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-native-styled-toast'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation/Navigation'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import AppProvider from './context/AppProvider'
import Colors, { toastTheme } from './constants/Colors'

export default function App() {
    const isLoadingComplete = useCachedResources()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='dark-light'
                    backgroundColor={Colors.main}
                    animated={true}
                />

                <AppProvider>
                    <ThemeProvider theme={toastTheme}>
                        <ToastProvider>
                            <NavigationContainer linking={LinkingConfiguration}>
                                <Navigation />
                            </NavigationContainer>
                        </ToastProvider>
                    </ThemeProvider>
                </AppProvider>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
})
