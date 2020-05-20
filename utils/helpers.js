import Colors from '../constants/Colors'

export const getRandomColor = () =>
    Colors.customer[Math.floor(Math.random() * Colors.customer.length)]

export function toHexString(byteArray) {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xff).toString(16)).slice(-2)
    }).join('')
}

export function formatMoney(
    amount,
    decimalCount = 2,
    decimal = '.',
    thousands = ',',
) {
    try {
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount

        const negativeSign = amount < 0 ? '-' : ''

        let i = parseInt(
            (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
        ).toString()
        let j = i.length > 3 ? i.length % 3 : 0

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCount)
                      .slice(2)
                : '')
        )
    } catch (e) {
        console.log(e)
    }
}
