import React, { useEffect, useState } from "react";
import { UIInput } from "../Input";
import UIButton from "../button";
import { Form, Col } from "react-bootstrap";


export default function UIForm ({entity: PropsEntity, onSubmit, onCancel, className, fields }) {

    const [entity, setEntity] = useState()

    useEffect(() => {
        if(PropsEntity) setEntity(PropsEntity)
    })

    if(!entity) {
        return (
            <Form onSubmit={onSubmit} className={`row ${className || '' }`} >
                {fields && fields.map(fieldItem => {
                    const { type, options, classNameInput, label, name } = fieldItem
                    return (
                        <Form.Group as={Col} className={classNameInput || ''}>
                            <UIInput name={name} label={label} type={type} options={options} />
                        </Form.Group>
                    )   
                })}
                <UIButton elementoHtml={"button"} className={"btn-outline-danger mr-4"} text={"Cancel"} onClick={(e) => {e.preventDefault();  onCancel()}} />
                <UIButton elementoHtml={"button"} type="submit" className={"btn-success"} text={"Confirm"}  />
            </Form>
        )
    }

    return (
        <Form onSubmit={onSubmit} className={`row ${className || '' }`}>
            {fields && fields.map(fieldItem => {
                const { value, type, options, onChange, classNameInput, label, name } = fieldItem
                return (
                    <>
                        <Form.Group  className={classNameInput || ''}>
                            <UIInput name={name} label={label} onChange={onChange} value={ entity && entity[name] } type={type} options={options} className={className}/> 
                        </Form.Group> 
                    </>
                )   
            })}
            <Col className="d-flex justify-content-end mt-4 col-12">
                <UIButton elementoHtml={"button"} className={"btn-outline-danger mr-4"} text={"Cancel"} onClick={(e) => {e.preventDefault();  onCancel()}} />
                <UIButton elementoHtml={"button"} type="submit" className={"btn-success"} text={"Confirm"}  />
            </Col>
        </Form>
    )


}