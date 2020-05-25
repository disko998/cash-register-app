import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import * as Random from 'expo-random'
import moment from 'moment'

import { getRandomColor, toHexString } from '../utils/helpers'

export const AppContext = React.createContext()
export const Provider = AppContext.Provider

export default class AppProvider extends Component {
    state = {
        customers: {},
        currency: 'din',
    }

    async componentDidMount() {
        const persistState = await this.persistState('GET')
        this.setState(persistState)

        //AsyncStorage.clear()
    }

    componentDidUpdate() {
        this.persistState('SET')
    }

    addCustomer = async () => {
        const { customers } = this.state
        const id = toHexString(await Random.getRandomBytesAsync(10))
        const randomColor = getRandomColor()

        this.setState(prevState => ({
            ...prevState,
            customers: {
                ...customers,
                [id]: {
                    title: 'Kasa',
                    price: 0,
                    bg: randomColor,
                    items: [],
                    date: new Date(),
                },
            },
        }))
    }

    removeCustomer = customerId => {
        const customers = this.state.customers

        delete customers[customerId]

        this.setState(prevState => ({
            ...prevState,
            customers,
        }))
    }

    addItem = async (customerId, cost) => {
        const customers = this.state.customers
        cost = this.isNumber(cost)

        if (!customers[customerId]) {
            throw new Error(`Nepoznat kupac, id: ${customerId}`)
        }

        if (!cost) {
            throw new Error('Pogresna cena')
        }

        customers[customerId].items.unshift({
            id: toHexString(await Random.getRandomBytesAsync(10)),
            cost,
            date: new Date(),
        })

        customers[customerId].price = this.calculatePrice(
            customers[customerId].items,
        )

        this.setState(prevState => ({
            ...prevState,
            customers,
        }))
    }

    removeItem = (customerId, itemId) => {
        const customers = this.state.customers

        customers[customerId].items = customers[customerId].items.filter(
            item => itemId !== item.id,
        )

        customers[customerId].price = this.calculatePrice(
            customers[customerId].items,
        )

        this.setState(prevState => ({
            ...prevState,
            customers,
        }))
    }

    checkout = (customer, checkoutAmount) => {
        // Set customer checkout
        const customers = this.state.customers

        customers[customer.id].checkout = parseFloat(checkoutAmount)

        this.setState({ ...this.state, customers })
    }

    validateCheckoutAmount = (amount, price) => {
        amount = this.isNumber(amount)

        if (!amount || amount < price) {
            return false
        }

        return true
    }

    calculatePrice = items => {
        return items.reduce((price, item) => item.cost + price, 0)
    }

    objToArray = obj => {
        return Object.keys(obj).map(key => ({ ...obj[key], id: key }))
    }

    isNumber = value => {
        if (!parseFloat(value) || isNaN(value)) {
            return false
        }

        return parseFloat(value)
    }

    persistState = async method => {
        try {
            if (method === 'SET') {
                return await AsyncStorage.setItem(
                    'persist',
                    JSON.stringify(this.state),
                )
            } else {
                return JSON.parse(await AsyncStorage.getItem('persist'))
            }
        } catch (error) {
            alert(error.message)
        }
    }

    calculateEarnings = period => {
        if (this.objToArray(this.state.customers).length) {
            switch (period) {
                case 'day':
                    const today = moment()
                    return this.objToArray(this.state.customers).reduce(
                        (amount, c) => {
                            const isToday = moment(c.date).isSame(today, 'day')
                            if (c.checkout && isToday) {
                                return c.checkout + amount
                            } else {
                                return amount
                            }
                        },
                        0,
                    )
                case 'week':
                    const lastWeek = moment().subtract(7, 'days')
                    return this.objToArray(this.state.customers).reduce(
                        (amount, c) => {
                            const isWeek = moment(c.date).isSameOrAfter(
                                lastWeek,
                            )
                            if (c.checkout && isWeek) {
                                return c.checkout + amount
                            } else {
                                return amount
                            }
                        },
                        0,
                    )
                case 'month':
                    const lastMonth = moment().subtract(1, 'month')
                    return this.objToArray(this.state.customers).reduce(
                        (amount, c) => {
                            const isMonth = moment(c.date).isSameOrAfter(
                                lastMonth,
                            )
                            if (c.checkout && isMonth) {
                                return c.checkout + amount
                            } else {
                                return amount
                            }
                        },
                        0,
                    )

                default:
                    return this.objToArray(this.state.customers).reduce(
                        (amount, c) => {
                            if (c.checkout) {
                                return c.checkout + amount
                            } else {
                                return amount
                            }
                        },
                        0,
                    )
            }
        }

        return 0
    }

    render() {
        const {
            addCustomer,
            objToArray,
            addItem,
            removeItem,
            removeCustomer,
            checkout,
            validateCheckoutAmount,
            calculateEarnings,
        } = this

        __DEV__ && console.log('STORE:', this.state)

        return (
            <Provider
                value={{
                    data: this.state,
                    actions: {
                        addCustomer,
                        objToArray,
                        addItem,
                        removeItem,
                        removeCustomer,
                        checkout,
                        validateCheckoutAmount,
                        calculateEarnings,
                    },
                }}
            >
                {this.props.children}
            </Provider>
        )
    }
}
