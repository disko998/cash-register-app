import React from 'react'
import { Platform, StyleSheet, View, FlatList } from 'react-native'
import Modal from 'modal-react-native-web'
import { Overlay, Text, Divider, Button } from 'react-native-elements'

import { formatMoney } from '../utils/helpers'
import Colors from '../constants/Colors'

const BillModal = ({ data, visible, toggleOverlay, payed = 0, onPress }) => {
    return Platform.OS !== 'web' ? (
        <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={styles.overlayStyle}
        >
            <View style={styles.wrapper}>
                <Text h4 style={styles.title}>
                    Vas racun:
                </Text>
                <FlatList
                    style={{ maxHeight: 200, width: '100%' }}
                    data={data.items}
                    renderItem={({ item, index }) => (
                        <React.Fragment key={item.id}>
                            <View style={styles.itemPriceView}>
                                <Text>{`#${index + 1}:\b\b`}</Text>
                                <Text>{formatMoney(item.cost)} din</Text>
                            </View>
                            <Divider style={styles.line} />
                        </React.Fragment>
                    )}
                    keyExtractor={item => item.id}
                />
                <Text style={styles.darkText}>
                    Za placanje: {formatMoney(data.price)} din
                </Text>
                <Text style={styles.darkText}>
                    Placeno: {formatMoney(payed)} din
                </Text>
                <Divider style={styles.line} />
                <Text h4 style={styles.exchange}>
                    Povracaj:{' '}
                    {formatMoney(parseFloat(payed) - parseFloat(data.price))}{' '}
                    din
                </Text>
                <Button
                    title='Potvrdi'
                    containerStyle={styles.button}
                    onPress={onPress}
                />
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
                <Text h4 style={styles.title}>
                    Vas racun:
                </Text>
                <FlatList
                    style={{ maxHeight: 200, width: '100%' }}
                    data={data.items}
                    renderItem={({ item, index }) => (
                        <React.Fragment key={item.id}>
                            <View style={styles.itemPriceView}>
                                <Text>{`#${index + 1}:\b\b`}</Text>
                                <Text>{formatMoney(item.cost)} din</Text>
                            </View>
                            <Divider style={styles.line} />
                        </React.Fragment>
                    )}
                    keyExtractor={item => item.id}
                />
                <Text style={styles.darkText}>
                    Za placanje: {formatMoney(data.price)} din
                </Text>
                <Text style={styles.darkText}>
                    Placeno: {formatMoney(payed)} din
                </Text>
                <Divider style={styles.line} />
                <Text h4 style={styles.exchange}>
                    Povracaj:{' '}
                    {formatMoney(parseFloat(payed) - parseFloat(data.price))}{' '}
                    din
                </Text>
                <Button
                    title='Potvrdi'
                    containerStyle={styles.button}
                    onPress={onPress}
                />
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
        marginBottom: 20,
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
        fontSize: 18,
    },
    line: { width: '100%', marginVertical: 10 },
    button: {
        width: '100%',
        backgroundColor: Colors.main,
        marginTop: 15,
    },
    exchange: {
        textAlign: 'center',
    },
})

export default BillModal
