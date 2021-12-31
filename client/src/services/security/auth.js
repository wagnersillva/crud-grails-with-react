import { API } from '../server';
import {SERVER_URL} from '../../config';
import Alert from '../../components/alert';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';

const clearAuth = () => {
  delete localStorage.auth
  delete localStorage.user
}

const refreshToken =  () => {
  const refresh_token = localStorage.auth ? JSON.parse(localStorage.auth).refresh_token : null
  if(!refresh_token){
    clearAuth()
  };
  return (
    refresh_token && 
  fetch(`${SERVER_URL}/oauth/access_token?grant_type=refresh_token&refresh_token=${refresh_token}`, {method: "POST" })
    .then(response => response.json())
    .then( response => {
      localStorage.auth = JSON.stringify(response)
      setUser({ auth: response })
      return true
    })
    .catch((e)=>{
      clearAuth();
      return false
    })
  )
}

const verifyToken = () => {
  console.log("chegou aqui")
  const headers ={
    "Content-Type":"application/json",
    "Accept":"application/json",
    "Authorization":`Bearer ${ localStorage.auth ? JSON.parse(localStorage.auth).access_token : null}`
  }

  const response = fetch(`${SERVER_URL}/api/products`, { headers })
      .then(async (e) => {
        if(e.status === 200) return true
        else return refreshToken();
      })
      .catch( (e) =>{ console.log(e) })
  return response
}


const setUser = ({ auth }) => {
  const customHeader ={
    "Content-Type":"application/json",
    "Accept":"application/json",
    "Authorization":`Bearer ${ auth ? auth.access_token : null}`
  }
  API.get({ url: `user/query?username=${auth.username}`, customHeader })
    .then(response => { if(response.success) localStorage.user = JSON.stringify(response.data.data) })
    .catch(error => {
        Alert({ type: "error", message: error.message })
    })
}


const setAuth = ({ auth }) => localStorage.auth = JSON.stringify(auth)

const getUserName = () => {
  if(localStorage.user && JSON.parse(localStorage.user).username) {
    return JSON.parse(localStorage.user).username
  }
}
const getUserId = () => {
  if(localStorage.user && JSON.parse(localStorage.user).id) {
    return JSON.parse(localStorage.user).id
  }
}
const getRole = () => {
  if(localStorage.auth && JSON.parse(localStorage.auth).roles) {
    return JSON.parse(localStorage.auth).roles
  }
}

const logIn = ({ auth }) => {
  return new Promise((resolve, reject) => {
    try {
      setAuth({ auth }); 
      setUser({ auth }) 
      resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}

const logOut = () => clearAuth()

const isLogged = () => {
  return localStorage.auth
}

export const Auth = {
    isLogged,
    verifyToken,
    logIn,
    logOut,
    getUserName,
    getUserId,
    getRole
}