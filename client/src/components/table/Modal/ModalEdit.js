import React, { useEffect, useState } from "react"
import { Col, Form } from "react-bootstrap"
import { API } from "../../../services/server"
import  Alert  from "../../alert"
import UIButton from "../../button"
import CustomModal from "../../modal"

export const ModalEdit = ({ show, onHide, props, contextTitle }) => {

    const [urlController, setUrlController] = useState();
    const [entity, setEntity] = useState();
    
    useEffect(() => {

        if(props.entity){
            setEntity(props.entity)
        }

        props.allColumns.map(column => {
            if(column.name === "actions") {
                setUrlController(column.urlController)
            }
        })
    }, [])

    const renderHeader = () => {
        if(contextTitle){
            return (
                <>
                    <span>{contextTitle} - Edit</span>
                </>
            )
        }else {
            return (
                <span>Edit</span>
            )
        }
    }

    const renderBody = (fn) => {
        console.log(entity)
        return (
            <Form className="row" onSubmit={(e) => save(e)}>
                {props.allColumns.map((column) => {
                    if(column.name !== "actions" && entity){
                        if(column.inputType === "textarea") {
                            return (
                                <Form.Group className="col-12 mb-3">
                                    <Form.Label className="mb-2">{column.name}</Form.Label>
                                    <Form.Control name={column.name} value={ entity[column.name]}  onChange={onChange} as="textarea" placeholder={`Insert the ${column.name}`} />
                                </Form.Group>
                            )
                        } else if(column.inputType === "select"){
                            return (
                                <Form.Group as={Col} className="col-6 mb-3">
                                    <Form.Label className="mb-2">{column.name}</Form.Label>
                                    <Form.Select onChange={onChangeSelect} name={column.name} className="form-control">
                                        {column.list.map(itemList => {
                                            return (
                                                <option  value={itemList.id} >
                                                    {itemList.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            )
                        } else {
                            return (
                                <Form.Group className="col-6 mb-3">
                                    <Form.Label className="mb-2">{column.name}</Form.Label>
                                    <Form.Control name={column.name} value={entity[column.name]} onChange={onChange} type={column.inputType} placeholder={`Insert the ${column.name}`} />
                                </Form.Group>
                            )
                        }
                    }
                })}
                <Col className="d-flex justify-content-end mt-4 col-12">
                    <UIButton elementoHtml={"button"} className={"btn-outline-danger mr-4"} text={"Cancel"} onClick={() => fn()} />
                    <UIButton elementoHtml={"button"} type="submit" className={"btn-success"} text={"Confirm"}  />
                </Col>
            </Form>
        )
    }

    const onChangeSelect = (e) => {
        const newEntity = {...entity}
        newEntity[e.target.name] = {id: parseInt(e.target.value), name: e.target.options[e.target.value-1].label}
        setEntity(newEntity)
    }

    const onChange = (e) => {
        const newEntity = {...entity}
        newEntity[e.target.name] = e.target.value
        setEntity(newEntity)
    }

    const save = (e) => {
        e.preventDefault();
        API.put({url: urlController, id: entity.id, body: entity })
            .then(() => {
                Alert.Success();
            })
            .catch(e => {
                Alert.Failed({message: e.message});
            })
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