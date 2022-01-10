import React, { Fragment }  from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ContentPage from '../components/content';
import { PrivateRoute } from '../components/privateRouter';
import Sidebar from '../components/sidebar';
import Categories from '../pages/categories';
import { Dashboard } from '../pages/dashboard';
import Home from '../pages/home';
import Logout from '../pages/login/logout';
import NotFound from '../pages/NotFound';
import Products from '../pages/products';
import { ViewProduct } from '../pages/products/ViewProduct';
import Users from '../pages/users';

const Router = (props) => {
    return (
        <BrowserRouter> 
            <Sidebar theme={props.theme}/>
            <ContentPage 
                theme={props.theme}
                content = {
                    <Routes>
                        <Fragment>
                            <Route path="/" index element={ <Home /> } />
                            <Route path="/products" element={ <Products /> } />
                            <Route path="/products/:id" element={ <ViewProduct /> } />
                            <Route path="/categories" element={  <Categories /> } />
                            <Route exact path="/users" element={ <PrivateRoute /> }>
                                <Route exact path="/users" element={  <Users /> } />
                            </Route>
                            <Route exact path="/dashboard" element={ <PrivateRoute /> }>
                                <Route exact path="/dashboard" element={  <Dashboard /> } />
                            </Route>

                            <Route path="/logout" element={  <Logout /> } />
                            <Route path="*" element={ <NotFound /> } />
                        </Fragment>
                    </Routes>
                }
            />
        </BrowserRouter>
    )
}

export default Router;