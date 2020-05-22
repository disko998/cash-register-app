import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Modal from 'modal-react-native-web'
import { Overlay, Text, Divider, Button } from 'react-native-elements'

import { formatMoney } from '../utils/helpers'
import Colors from '../constants/Colors'

const BillModal = ({ data, visible, toggleOverlay, payed = 0 }) => {
    return Platform.OS !== 'web' ? (
        <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={styles.overlayStyle}
        >
            <View style={styles.wrapper}>
                <Text h3 style={styles.title}>
                    Vas racun:
                </Text>
                {data.items.map((item, i) => (
                    <React.Fragment key={item.id}>
                        <View style={styles.itemPriceView}>
                            <Text>{`#${i + 1}:\b\b`}</Text>
                            <Text>{formatMoney(item.cost)} din</Text>
                        </View>
                        <Divider style={styles.line} />
                    </React.Fragment>
                ))}
                <Text h4 style={styles.darkText}>
                    Za placanje: {formatMoney(data.price)} din
                </Text>
                <Text h4 style={styles.darkText}>
                    Placeno: {formatMoney(payed)} din
                </Text>
                <Divider style={styles.line} />
                <Text h4>
                    Povracaj:{' '}
                    {formatMoney(parseFloat(payed) - parseFloat(data.price))}{' '}
                    din
                </Text>
                <Button title='Potvrdi' containerStyle={styles.button} />
            </View>
        </Overlay>
    ) : (
        <Overlay
            ModalComponent={Modal}
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={styles.overlayStyle}
        >
            <View style={styles.wrapper}>
                <Text h3 style={styles.title}>
                    Vas racun:
                </Text>
                {data.items.map((item, i) => (
                    <React.Fragment key={item.id}>
                        <View style={styles.itemPriceView}>
                            <Text>{`#${i + 1}:    `}</Text>
                            <Text>{formatMoney(item.cost)} din</Text>
                        </View>
                        <Divider style={styles.line} />
                    </React.Fragment>
                ))}
                <Text h4 style={styles.darkText}>
                    Za placanje: {formatMoney(data.price)} din
                </Text>
                <Text h4 style={styles.darkText}>
                    Placeno: {formatMoney(payed)} din
                </Text>
                <Divider style={styles.line} />
                <Text h4>
                    Povracaj:{' '}
                    {formatMoney(parseFloat(payed) - parseFloat(data.price))}{' '}
                    din
                </Text>
                <Button title='Potvrdi' containerStyle={styles.button} />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlayStyle: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        padding: 10,
    },
    title: {
        marginBottom: 15,
    },
    itemPriceView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    darkText: {
        color: Colors.darkGray,
        marginVertical: 2,
        textAlign: 'center',
    },
    line: { width: '100%', marginVertical: 10 },
    button: {
        width: '100%',
        backgroundColor: Colors.main,
        marginTop: 15,
    },
})

export default BillModal
