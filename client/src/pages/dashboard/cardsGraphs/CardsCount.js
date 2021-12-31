import React, { useEffect, useState } from "react"
import { API } from "../../../services/server"
import { FaUserCog, FaUser, FaBoxes, FaList } from 'react-icons/fa'


const CardsCount = ({ value, label, icon }) => {

        return (
            <div className='card-value-graph shadown-dash-default'>
                <div className='box-text'>
                    <div className='data'>{value || 0}</div>
                    <div className='label'>{label || "Value"}</div>
                </div>
                <div className='box-icon'>
                    {icon}
                </div>
            </div>
        )
}


export const CountUsers = () => {

    const [users, setUsers] = useState()
    const [admin, setAdmin] = useState()

    useEffect(() => {
        API.get({ url: "user?max=9999" })
        .then(e => { 
            const UsersData = e.success ? e.data.data : null;
            if( e.success && UsersData.length ) {
                let dataAdmin = []
                let dataUsers = []
                UsersData.sort( (a, b) => b.products.length - a.products.length )
                UsersData.map( (user, index) =>{
                    if(user.roles && user.roles.length){
                        user.roles.map( role => {
                            if(role.name === "ROLE_ADMIN") dataAdmin = [...dataAdmin, user]
                            if(role.name === "ROLE_USER") dataUsers = [...dataUsers, user]
                        })
                    }
                })
                setUsers(dataUsers.length)
                setAdmin(dataAdmin.length)
            } 
        });
    }, [])

    return (
        <>
            <CardsCount value={admin} label={"Admin"} icon={<FaUserCog />} />
            <CardsCount value={users} label={"Users"} icon={<FaUser />} />
        </>
    )

}

export const CountCategories = () => {

    const [ count, setCount] = useState();

    useEffect(() => {
        API.get({ url: "categories?max=9999" })
        .then(e => { 
            const categoriesData = e.success ? e.data : null;
            if( e.success && categoriesData ) {
                setCount(categoriesData.total)
            } 
        });
    }, [])
    
    return <CardsCount value={count} label={"Categories"} icon={<FaList />} />
}

export const CountProducts = () => {
    const [ count, setCount] = useState();

    useEffect(() => {
        API.get({ url: "products?max=9999" })
        .then(e => { 
            const productsData = e.success ? e.data : null;
            if( e.success && productsData ) {
                setCount(productsData.total)
            } 
        });
    }, [])
    
    return <CardsCount value={count} label={"Products"} icon={<FaBoxes />} />
}



//  admin
//  user
//  categories
//  products