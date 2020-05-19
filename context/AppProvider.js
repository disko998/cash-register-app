import React, { Component } from 'react'
import Colors from '../constants/Colors'
import { getRandomColor } from '../utils/helpers'

export const AppContext = React.createContext()
export const Provider = AppContext.Provider

const ITEM = { cost: Math.floor(Math.random() * 500) }

const CUSTOMERS = [
    {
        id: '1',
        title: 'Kupac',
        price: 230,
        bg: Colors.customer[0],
        items: [ITEM],
    },
    {
        id: '2',
        title: 'Kupac',
        price: 650.32,
        bg: Colors.customer[1],
        items: [ITEM, ITEM],
    },
    {
        id: '3',
        title: 'Kupac',
        price: 350,
        bg: Colors.customer[2],
        items: [ITEM, ITEM, ITEM],
    },
]

export default class AppProvider extends Component {
    state = {
        customers: CUSTOMERS,
    }

    componentDidMount() {
        this.calculatePrice()
    }

    addCustomer = () => {
        const { customers } = this.state
        this.setState({
            ...this.state,
            customers: [
                ...customers,
                {
                    id: customers.length + 1,
                    title: 'Kupac',
                    price: 0,
                    bg: getRandomColor(),
                    items: [],
                },
            ],
        })
    }

    calculatePrice = () => {
        const customers = this.state.customers.map(customer => {
            const price = customer.items.reduce((price, item) => {
                return item.cost + price
            }, 0)

            return { ...customer, price }
        })

        this.setState({ ...this.state, customers })
    }

    addItem = customerId => {}

    render() {
        const { addCustomer } = this

        return (
            <Provider value={{ data: this.state, actions: { addCustomer } }}>
                {this.props.children}
            </Provider>
        )
    }
}
