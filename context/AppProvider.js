import React, { Component } from 'react'
import * as Random from 'expo-random'

import Colors from '../constants/Colors'
import { getRandomColor, toHexString } from '../utils/helpers'

export const AppContext = React.createContext()
export const Provider = AppContext.Provider

const item = () => ({
    cost: Math.floor(Math.random() * 500),
})

const CUSTOMERS = {
    asdastg21j3: {
        title: 'Kupac',
        price: 230,
        bg: Colors.customer[0],
        items: [item()],
    },
    dnam12e2hj3e: {
        title: 'Kupac',
        price: 650.32,
        bg: Colors.customer[1],
        items: [item(), item()],
    },
    adsn1n2h12j21h: {
        title: 'Kupac',
        price: 350,
        bg: Colors.customer[2],
        items: [item(), item(), item()],
    },
}

export default class AppProvider extends Component {
    state = {
        customers: {},
    }

    componentDidMount() {
        // this.calculatePrice()
    }

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

        customers[customerId].items.push({
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
        } = this

        console.log('STATE:', this.state)

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
                    },
                }}
            >
                {this.props.children}
            </Provider>
        )
    }
}
