import React from 'react'
import { Auth } from '../../services/security/auth'
import { Navigate, Outlet } from 'react-router-dom';


const isAdmin = () => {
    const ROLE = Auth.getRole()
    return ROLE && ROLE.includes('ROLE_ADMIN') ? true : false
}

export const PrivateRoute =() => isAdmin() ? <Outlet /> : <Navigate to="/" />