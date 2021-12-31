import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import ThemeButton from '../components/themeButton';
import UserConfig from '../components/UserConfig';
import Router from './router';
import {Auth} from '../services/security/auth'; 
import { Login } from '../pages/login';
import 'antd/dist/antd.css';

const DEFAULT_VALUE =  {
    theme: "light"
}


const App = () => {
    const [theme, setTheme] = useState(DEFAULT_VALUE.theme)
    const [ isLogged, setIsLogged ] = useState(true) 
    const [loading, setLoading] = useState(false) 
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        if(Auth.isLogged()){
            Auth.verifyToken()
            .then((e) => { setLoading(!e); setIsLogged(e) })
            .catch(() => setIsLogged(false))
        } else setIsLogged(false)
    }, [])

    if(!isLogged) return <Login />
 
    return (
        <Spin  spinning={loading} indicator={ <LoadingOutlined style={{ fontSize: 24 }} />}>
            <div className="container-app">
                <div className={`content-header theme--${theme}`}>
                    <ThemeButton theme={ theme } changeTheme={toggleTheme} />
                    <UserConfig theme={ theme } />
                </div>
                <Router theme={ theme }/>
            </div>
        </Spin>
    )

};

export default App;
