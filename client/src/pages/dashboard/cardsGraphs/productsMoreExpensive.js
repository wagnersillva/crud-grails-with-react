import React, { useEffect, useState } from 'react'
import { CardHorizontalBar } from '../../../components/ChartCards/HorizontalBar'
import { CardPie } from '../../../components/ChartCards/Pie'
import { API } from '../../../services/server'

export const ProductsMoreExpensive = () => { 

    const [ data, setData ] = useState([])
    const [ backgroundColors, setBackgroundColors ] = useState([])
    const [ PropsLabels, setPropsLabels ] = useState([])

    const  label = "Product price"
    const title = "Products more expensive"

    useEffect(() => {
        API.get({ url: "products?max=5&sort=price&order=desc" })
        .then(e => { 
            const ProductsData = e.success ? e.data.data : null;
            if( e.success && ProductsData.length ) {
                let newData = []
                let newBackgroundColor = []
                let newPropsLabels = []
                ProductsData.map( (product, index) =>{
                        newData = [...newData, product.price]
                        newBackgroundColor = [...newBackgroundColor, index]
                        newPropsLabels = [...newPropsLabels, `${product.name} \n`]
                })
                setData(newData)
                setBackgroundColors(newBackgroundColor)
                setPropsLabels(newPropsLabels)
            } 
        });
    }, [])


    const max = data[0] % 2 === 0 ? data[0] + 4 : data[0] + 5

    return (
        <CardPie 
            PropsLabels={PropsLabels} 
            PropsDataSet={{ data, backgroundColors, label }} 
            max={max}
        />
    )
}