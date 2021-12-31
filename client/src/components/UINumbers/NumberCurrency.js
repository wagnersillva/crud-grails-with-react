export const NumberCurrency = ({ currencyType, value }) => {
    if(!value) return "Number is required"

    if(!currencyType) return formatt["BR"]({ value })

    return formatt[currencyType]({ value })

} 

const formatt = {
    BR: ({ value }) => value && `R$ ${value.toLocaleString("BR")}` 
}