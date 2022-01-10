import { ConsoleSqlOutlined } from "@ant-design/icons/lib/icons";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Auth } from "../../services/security/auth";
import { API } from "../../services/server";
import Alert from "../alert";
import UIButton from "../button";
import { UIInput } from "../Input";
import CustomModal from "../modal";

export const ModalEdit = ({ show, onHide, props, contextTitle }) => {

    const [urlController, setUrlController] = useState();
    const [entity, setEntity] = useState(null);
    const [fields, setFields] = useState([]);

    useEffect(() => {
        if(props.entity) {
            setEntity(props.entity)
        } else {
            setEntity(null)
        }
        if(props.service) setUrlController(props.service)
        if(props.allColumns) {
            const fields = []
            props.allColumns && props.allColumns.map (column => {
                const { title, classNameInput, inputNumber, inputType, list, required } = column
                if(column !== "actions"){
                    fields.push({
                        name: title,
                        label: title,
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
                {fields && fields.map(fieldItem => {
                    const { type, options, classNameAreaInput, label, name, required } = fieldItem
                    if(name !== "actions") {
                        if(type === "numberInt" || type === "numberFloat"){
                            return (
                                <Form.Group as={Col} className={classNameAreaInput || ''}>
                                    <UIInput classNameInput={`form-control ${required ? 'is-require':''} input-control-validate input-control-${name}`} value={entity ? entity[name] : ''} placeholder={`Insert the ${name}`} id={type} onChange={onChangeNumber} name={name} label={`${label}${required ? '*':''}`} type={type}/>
                                    <span className={`${required ? 'is-require':''} label-control-validate label-control-${name}`}> {name} is required </span>
                                </Form.Group>
                            )   
                        } else if(type === "select"){
                            return (
                                <Form.Group as={Col} className={classNameAreaInput || ''}>
                                    {label && <Form.Label className="mb-2">{label}</Form.Label>}
                                    <Form.Select onChange={onChangeSelect} name={name} className={`form-control ${required ? 'is-require':''} input-control-validate input-control-${name}`}>
                                        <option selected={ !entity || !entity[name] && true } disabled>
                                            Select {name}
                                        </option>
                                        {options && options.map(itemList => {
                                            return (
                                                <option  value={itemList.id} selected={ entity && entity[name] && entity[name].id === itemList.id }  >
                                                    {itemList.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>
                                    <span className={`${required ? 'is-require':''} label-control-validate label-control-${name}`}> {name} is required </span>
                                </Form.Group>
                            )   
                        } else {
                            return (
                                <Form.Group as={Col} className={classNameAreaInput || ''}>
                                    <UIInput classNameInput={`form-control ${required ? 'is-require':''} input-control-validate input-control-${name}`}  value={entity ? entity[name] : ''} placeholder={`Insert the ${name}`} onChange={onChange} name={name} label={`${label}${required ? '*':''}`} type={type}/>
                                    <span className={`${required ? 'is-require':''} label-control-validate  label-control-${name}`}> {name} is required </span>
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
        const { value, options, name } = e.target
        newEntity[name] = {id: parseInt(value), name: options[options.selectedIndex].label}
        console.log(e.target)
        setEntity(newEntity)
    }

    const onChangeNumber = (e) => {
        const newEntity = {...entity}
        const { value, name, validity: { valid }, id  } = e.target
        if(valid){
            newEntity[name] = id === "numberInt" ? parseInt(value) : parseFloat(value)
        }
        console.log(id)
        setEntity(newEntity)
    }
    const onChange = (e) => {
        const newEntity = {...entity}
        const { value, name  } = e.target
        newEntity[name] = value
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
                const input = window.document.querySelector(`.input-control-${field.name}.is-require`)
                const label = window.document.querySelector(`.label-control-${field.name}.is-require`)
                if( entity && field.name !== "actions" && field.required && !entity[field.name]) {
                    errors.push(field.name)
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
            if(entity.id){
                API.put({url: `${urlController}/update`, id: entity.id, body: entity })
                .then(() => {
                    Alert({ type: "success"})
                    setTimeout(()=>{
                        window.location.reload()
                    }, 5000)
                })
                .catch(e => Alert({ type: 'error', message: e.message }) )
            } else {
                entity["user_creator"] = Auth.getUserId()
                 API.post({url: `${urlController}/save`, body: entity })
                .then(() => {
                    Alert({ type: "success" })
                    setTimeout(()=>{
                        window.location.reload()
                    }, 5000)
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