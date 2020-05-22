import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Button, Divider } from 'react-native-elements'

import Colors from '../constants/Colors'

const InputForm = React.forwardRef(
    ({ title, onSubmit, top, ...InputProps }, ref) => (
        <>
            {top && <Divider style={[styles.line, { marginTop: 0 }]} />}
            <View style={styles.wrapper}>
                <TextInput
                    ref={ref}
                    style={styles.input}
                    keyboardType='numeric'
                    {...InputProps}
                />
                <Button
                    title={title}
                    onPress={onSubmit}
                    buttonStyle={styles.button}
                    titleStyle={styles.titleStyle}
                />
            </View>
            {!top && <Divider style={styles.line} />}
        </>
    ),
)

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.main,
        minHeight: 50,
        minWidth: 100,
    },
    wrapper: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginRight: 10,
        flex: 1,
        minHeight: 50,
        borderRadius: 10,
        backgroundColor: Colors.grayLight,
        padding: 10,
        maxWidth: 500,
    },
    titleStyle: {
        textTransform: 'uppercase',
    },
    line: { width: '100%', marginVertical: 10 },
})

export default InputForm
