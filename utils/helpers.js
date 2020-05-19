import Colors from '../constants/Colors'

export const getRandomColor = () =>
    Colors.customer[Math.floor(Math.random() * Colors.customer.length)]
