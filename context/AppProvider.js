import React, { Component } from 'react'
import Colors from '../constants/Colors'
import { getRandomColor } from '../utils/helpers'

export const AppContext = React.createContext()
export const Provider = AppContext.Provider

const DATA = [
    {
        id: '1',
        title: 'Kupac',
        price: 230,
        bg: Colors.customer[0],
    },
    {
        id: '2',
        title: 'Kupac',
        price: 650.32,
        bg: Colors.customer[1],
    },
    {
        id: '3',
        title: 'Kupac',
        price: 350,
        bg: Colors.customer[2],
    },
]

export default class AppProvider extends Component {
    state = {
        customers: DATA,
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
                },
            ],
        })
    }

    render() {
        const { addCustomer } = this

        return (
            <Provider value={{ data: this.state, actions: { addCustomer } }}>
                {this.props.children}
            </Provider>
        )
    }
}
