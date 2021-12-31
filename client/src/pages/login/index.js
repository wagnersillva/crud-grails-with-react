import { Alert } from "antd";
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import UIButton from "../../components/button";
import { Auth } from "../../services/security/auth";
import { API } from "../../services/server";
import "./style.css"


const styleAlert = {
    boxShadow: "3px 3px 5px #ff00000f", 
    position: "absolute", 
    top:"-100px", 
    border:"none"
}

export const Login = () => {

    const [entity, setEntity] = useState();
    const [showAlert, setShowAlert] = useState(false);

    const handlerChange = (e) => {  
        const {name, value} = e.target;
        const changeValueEntity = {...entity}
        changeValueEntity[name] = value;
        setEntity(changeValueEntity)

    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        
        API.post({url:"login", body: entity })
            .then( response => {
                if(response.success){
                    Auth.logIn({ auth: response.data }).then(()=>{
                        window.location = "/";
                    })
                };
        }).catch( e => {
            setShowAlert(true)
        })

    }

    return (
        <>

            <Form onSubmit={(e) => handlerSubmit(e)} className="form-login col-4 d-flex flex-column align-items-center">
                { showAlert ? <Alert message="Username or password invalid" style={ styleAlert } className="mb-4 col-10"  type="error" showIcon /> : null }
                <Form.Group className="mb-4 col-10" controlId="username">
                    <Form.Label className="mb-2">Username</Form.Label>
                    <Form.Control onChange={handlerChange} name="username" type="username" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-5 col-10" controlId="password">
                    <Form.Label className="mb-2">Password</Form.Label>
                    <Form.Control onChange={handlerChange} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="d-flex flex-row justify-content-end col-10" controlId="password">
                    <UIButton elementoHtml={"button"} type="submit" className={"success"}  text={"Login"}/>
                </Form.Group>
            </Form>
        </>
    )


}