import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'

import Colors from '../constants/Colors'
import { formatMoney } from '../utils/helpers'

export default function MenuScreen({ earned, week, month, day }) {
    return (
        <ScrollView style={{ padding: 0, margin: 0 }}>
            <View style={styles.wrapper}>
                <View style={styles.amountEarned}>
                    <Text style={styles.earnedText}>Ukupna zarada:</Text>
                    <Text style={styles.earnedLabel}>{`${formatMoney(
                        earned,
                    )} din`}</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.labelText}>{`Dnevna: ${formatMoney(
                        day,
                    )} din`}</Text>
                </View>
                <View style={styles.week}>
                    <Text style={styles.labelText}>{`Nedeljna: ${formatMoney(
                        week,
                    )} din`}</Text>
                </View>
                <View style={styles.month}>
                    <Text style={styles.labelText}>{`Mesecna: ${formatMoney(
                        month,
                    )} din`}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        margin: 0,
        padding: 0,
    },
    amountEarned: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.main,
        justifyContent: 'center',
        alignItems: 'center',
    },
    day: {
        width: '100%',
        padding: 15,
        backgroundColor: Colors.ocean,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 100,
    },
    week: {
        width: '100%',
        padding: 15,
        backgroundColor: Colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 100,
    },
    month: {
        width: '100%',
        padding: 15,
        backgroundColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 100,
    },

    earnedText: {
        textTransform: 'uppercase',
        color: Colors.white,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    earnedLabel: {
        color: Colors.white,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    labelText: {
        color: Colors.white,
        fontSize: 20,
        textAlign: 'center',
    },
})
