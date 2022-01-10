import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Auth } from "../../../services/security/auth";
import { API } from "../../../services/server";
import Alert from "../../../components/alert";
import UIButton from "../../../components/button";
import { UIInput } from "../../../components/Input";
import CustomModal from "../../../components/modal";

export const ModalEdit = ({ show, onHide, props, contextTitle }) => {

    const [urlController, setUrlController] = useState();
    const [entity, setEntity] = useState(null);
    const [fields, setFields] = useState([]);

    const ENUM_ROLES = {
        "Admin":"ROLE_ADMIN",
        "User": "ROLE_USER",
        "ROLE_ADMIN":"ROLE_ADMIN",
        "ROLE_USER": "ROLE_USER"
    }


    useEffect(() => {
        if(props.entity) {
            setEntity(props.entity)
        } else {
            setEntity(null)
        }
        if(props.service) setUrlController(props.service)
        if(props.allColumns) {
            const fields = []
            // eslint-disable-next-line
            props.allColumns && props.allColumns.map (column => {
                const { title, label, classNameInput, inputNumber, inputType, list, required } = column
                if(column !== "actions"){
                    fields.push({
                        title: title,
                        label: label || title,
                        required: required,
                        classNameAreaInput: classNameInput || '',
                        type: inputType === "number" ? inputNumber : inputType,
                        options: list || null
                    })
                }
            })
            setFields(fields)
        }
    }, [props])

    const renderHeader = () => {
        if(contextTitle){
            return (
                <>
                    <span>{contextTitle} - {props.entity ? "Edit" : "Create"}</span>
                </>
            )
        }else {
            return (
                <span>{props.entity ? "Edit" : "Create"}</span>
            )
        }
    }
    const renderBody = (onCancel) => {
          return (
            <Form className="row" onSubmit={(e) =>{ save(e) }} >
                { fields && fields.map(fieldItem => {
                    const { type, options, classNameAreaInput, label, title, required } = fieldItem
                    if(title !== "actions") {
                        if(type === "numberInt" || type === "numberFloat"){
                            return (
                                <Form.Group as={Col} className={classNameAreaInput || ''}>
                                    <UIInput classNameInput={`form-control ${required ? 'is-require':''} input-control-validate input-control-${title}`} value={entity ? entity[title] : ''} placeholder={`Insert the ${title}`} id={type} onChange={onChangeNumber} name={title} label={`${label}${required ? '*':''}`} type={type}/>
                                    <span className={`${required ? 'is-require':''} label-control-validate label-control-${title}`}> {title} is required </span>
                                </Form.Group>
                            )   
                        } else if(type === "select"){
                            return (
                                <Form.Group as={Col} className={classNameAreaInput || ''}>
                                    {label && <Form.Label className="mb-2">{label}</Form.Label>}
                                    <Form.Select onChange={title === "enabled" ? onChangeSelectEnabled : onChangeSelect } name={title} className={`form-control ${required ? 'is-require':''} input-control-validate input-control-${title}`}>
                                        <option selected={ !entity && true }>
                                            Select {title}
                                        </option>
                                        {options && options.map(itemList => {
                                            if(title === "enabled"){
                                                return (
                                                    <option  value={itemList.id} selected={ entity &&  entity[title] === itemList.id || entity[title] === "active" }>
                                                        {itemList.name}
                                                    </option>
                                                )
                                            } else {
                                                return (
                                                    <option  value={itemList.id} selected={ entity && entity[title][0].name === itemList.id }>
                                                        {itemList.name}
                                                    </option>
                                                )
                                            }
                                        })}
                                    </Form.Select>
                                    <span className={`${required ? 'is-require':''} label-control-validate label-control-${title}`}> {title} is required </span>
                                </Form.Group>
                            )   
                        } else {
                            return (
                                <Form.Group as={Col} className={classNameAreaInput || ''}>
                                    <UIInput pattern={ title === "username" ? "([aA-zZ]+)" : null } classNameInput={`form-control ${required ? 'is-require':''} input-control-validate input-control-${title}`}  value={entity ? entity[title] : ''} placeholder={`Insert the ${title}`} onChange={onChange} name={title} label={`${label}${required ? '*':''}`} type={type}/>
                                    <span className={`${required ? 'is-require':''} label-control-validate  label-control-${title}`}> {title} is required </span>
                                </Form.Group>
                            )   
                        }
                    }
                })}
                <Col className="d-flex justify-content-end mt-6 col-12">
                    <UIButton elementoHtml={"button"} className={"btn-outline-danger mr-4"} text={"Cancel"} onClick={(e) => {e.preventDefault();  onCancel();}} />
                    <UIButton elementoHtml={"button"} type="submit" className={"btn-success"} text={"Confirm"}  />
                </Col>
            </Form>
          )
    }



    const onChangeSelect = (e) => {
        const newEntity = {...entity}
        const {  options, name } = e.target
        newEntity[name] = [{ name: options[options.selectedIndex].label }]
        setEntity(newEntity)
    }

    const onChangeSelectEnabled = (e) => {
        const newEntity = {...entity}
        const {  options, name } = e.target
        newEntity[name] = options[options.selectedIndex].label
        console.log(newEntity)
        setEntity(newEntity)
    }

    const onChangeNumber = (e) => {
        const newEntity = {...entity}
        const { value, name, validity: { valid }, id  } = e.target
        if(valid){
            newEntity[name] = id === "numberInt" ? parseInt(value) : parseFloat(value)
        }
        setEntity(newEntity)
    }
    const onChange = (e) => {
        const newEntity = {...entity}
        const { value, name, validity: { valid }  } = e.target
        if(valid){ 
            newEntity[name] = value
        }
        setEntity(newEntity)
    }

    const verifyValues = (e) => {
        const errors = []
        if(!entity){
            window.document.querySelectorAll(`.input-control-validate.is-require`).forEach( input => {
                input.classList.add("input-invalid")
            })
            window.document.querySelectorAll(`.label-control-validate.is-require`).forEach(label => {
                label.classList.add("input-invalid")
            })
            errors.push("error")
        } else {
             fields && fields.map( field => {
                const input = window.document.querySelector(`.input-control-${field.title}.is-require`)
                const label = window.document.querySelector(`.label-control-${field.title}.is-require`)
                if( entity && field.title !== "actions" && field.required && !entity[field.title]) {
                    errors.push(field.title)
                    input && input.classList.add("input-invalid")
                    label && label.classList.add("input-invalid")
                } else {
                    if(input){
                        input.classList.remove("input-invalid") 
                        input.classList.add("input-valid")
                    }
                    label && label.classList.remove("input-invalid")
                }
                 
             })
         }
        if(!errors.length) return true
    }

    const save = (e) => {
        e.preventDefault();
        if(verifyValues()){
            const body = {
                user: {
                    username: entity.username,
                    enabled: entity.enabled === "active" ? true : false
                },
                role:{
                    authority: entity.roles[0].name ? ENUM_ROLES[entity.roles[0].name] : "ROLE_USER"
                }
            }
            if(entity.id){
                API.put({url: `${urlController}/update`, id: entity.id, body: body })
                .then(() => {
                    Alert({ type: "success"})
                    setTimeout(()=>{
                        window.location.reload()
                    }, 2750)
                })
                .catch(e => Alert({ type: 'error', message: e.message }) )
            } else {
                entity["user_creator"] = Auth.getUserId()
                 API.post({url: `${urlController}/save`, body: body })
                .then(() => {
                    Alert({ type: "success" })
                    setTimeout(()=>{
                        window.location.reload()
                    }, 2750)
                })
                .catch(e => Alert({ type: 'error', message: e.message }) )
            }
        }
    }

    return (
        <>
            <CustomModal
                show={show} 
                onHide={onHide}
                header = {renderHeader()}
                body={renderBody(onHide)}
            />
        </>

    )
}