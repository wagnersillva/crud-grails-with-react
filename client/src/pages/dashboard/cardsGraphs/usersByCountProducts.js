import React, { useEffect, useState } from 'react'
import { TopRanking } from '../../../components/ChartCards/topRanking'
import { API } from '../../../services/server'

export const UsersByCountProducts = () => { 

    const [ data, setData ] = useState([])

    useEffect(() => {
        API.get({ url: "user?max=9999" })
        .then(e => { 
            const UsersData = e.success ? e.data.data : null;
            if( e.success && UsersData.length ) {
                let newData = []
                UsersData.sort( (a, b) => b.products.length - a.products.length )
                UsersData.map( (user, index) =>{
                    if(index < 10) {
                        newData = [...newData, { name: user.username, value: user.products.length }]
                    }
                })
                setData(newData)
            } 
        });
    }, [])

    return (
        <TopRanking 
            data={data} 
        />
    )
}