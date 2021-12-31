import React, { useEffect, useState } from 'react'
import { CardHorizontalBar } from '../../../components/ChartCards/HorizontalBar'
import { API } from '../../../services/server'

export const CategoriesByCountProducts = () => { 

    const [ data, setData ] = useState([])
    const [ backgroundColors, setBackgroundColors ] = useState([])
    const [ PropsLabels, setPropsLabels ] = useState([])

    const  label = "Quantity of products"
    const title = "Top 5 Categories by Products quantity"

    useEffect(() => {
        API.get({ url: "categories?max=9999" })
        .then(e => { 
            const categoriesData = e.success ? e.data.data : null;
            if( e.success && categoriesData.length ) {
                let newData = []
                let newBackgroundColor = []
                let newPropsLabels = []
                categoriesData.sort( (a, b) => b.products.length - a.products.length )
                categoriesData.map( (category, index) =>{
                    if(index < 5) {
                        newData = [...newData, category.products.length]
                        newBackgroundColor = [...newBackgroundColor, index]
                        newPropsLabels = [...newPropsLabels, category.name]
                    }
                })
                setData(newData)
                setBackgroundColors(newBackgroundColor)
                setPropsLabels(newPropsLabels)
            } 
        });
    }, [])

    const max = data[0] % 2 === 0 ? data[0] + 2 : data[0] + 1

    return (
        <CardHorizontalBar 
            PropsLabels={PropsLabels} 
            PropsDataSet={{ data, backgroundColors, label }} 
            max={max}
        />
    )
}