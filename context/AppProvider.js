import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import * as Random from 'expo-random'

import { getRandomColor, toHexString } from '../utils/helpers'

export const AppContext = React.createContext()
export const Provider = AppContext.Provider

export default class AppProvider extends Component {
    state = {
        customers: {},
    }

    componentDidMount() {}

    addCustomer = async () => {
        const { customers } = this.state
        const id = toHexString(await Random.getRandomBytesAsync(10))

        this.setState({
            ...this.state,
            customers: {
                ...customers,
                [id]: {
                    title: 'Kasa',
                    price: 0,
                    bg: getRandomColor(),
                    items: [],
                },
            },
        })
    }

    removeCustomer = async customerId => {
        const customers = this.state.customers

        if (!customers[customerId]) {
            alert(`Doslo je do greske, nepoznat ${customerId}`)
            return
        }

        delete customers[customerId]

        this.setState(prevState => ({
            ...prevState,
            customers,
        }))
    }

    addItem = async (customerId, cost) => {
        const customers = this.state.customers

        if (!customers[customerId]) {
            alert(`Doslo je do greske, nepoznat ${customerId}`)
            return
        }

        if (!parseFloat(cost)) {
            alert('Greska pri unosu cene')
            return
        }

        customers[customerId].items.unshift({
            id: toHexString(await Random.getRandomBytesAsync(10)),
            cost,
        })

        customers[customerId].price =
            parseFloat(customers[customerId].price) + parseFloat(cost)
        this.setState(prevState => ({
            ...prevState,
            customers,
        }))
    }

    removeItem = async (customerId, itemId) => {
        const customers = this.state.customers

        if (!customers[customerId]) {
            alert(`Doslo je do greske, nepoznat ${customerId}`)
            return
        }

        customers[customerId].items = customers[customerId].items.filter(
            item => {
                if (itemId !== item.id) {
                    return true
                }

                customers[customerId].price =
                    parseFloat(customers[customerId].price) -
                    parseFloat(item.cost)

                return false
            },
        )

        this.setState(prevState => ({
            ...prevState,
            customers,
        }))
    }

    checkout = async data => {
        if (!data) {
            return
        }

        // Save bill in AsyncStorage
        // await AsyncStorage.setItem('bill', data)

        // Set customer to completed
        const customers = this.state.customers

        customers[data.id].completed = true

        this.setState({ ...this.state, customers })
    }

    calculatePrice = () => {
        const customers = this.state.customers
        const customersArray = Object.keys(customers)

        const updatedCustomers = customersArray.map(key => {
            const price = customers[key].items.reduce((price, item) => {
                return item.cost + price
            }, 0)

            return { ...customers[key], price }
        })

        this.setState({ ...this.state, customers: updatedCustomers })
    }

    objToArray = obj => {
        return Object.keys(obj).map(key => ({ ...obj[key], id: key }))
    }

    render() {
        const {
            addCustomer,
            objToArray,
            addItem,
            removeItem,
            removeCustomer,
            checkout,
        } = this

        __DEV__ && console.log('STATE:', this.state)

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
                    },
                }}
            >
                {this.props.children}
            </Provider>
        )
    }
}
