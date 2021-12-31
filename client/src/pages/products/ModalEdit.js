import React, { useEffect, useState } from "react"
import { Col, Form } from "react-bootstrap"
import { API } from "../../services/server"
import  Alert from "../../components/alert"
import UIButton from "../../components/button"
import CustomModal from "../../components/modal"
import { Auth } from "../../services/security/auth"

export const ModalEdit = ({ show, onHide, columns, contextTitle }) => {

    const [urlController, setUrlController] = useState();
    const [entity, setEntity] = useState();
    
    useEffect(() => {
        columns.map(column => {
            if(column.name === "actions") {
                setUrlController(column.urlController)
            }
        })

    }, [])

    const renderHeader = () => {
        if(contextTitle){
            return (
                <>
                    <span>{contextTitle} - Create</span>
                </>
            )
        }else {
            return (
                <span>Create</span>
            )
        }
    }

    const renderBody = (fn) => {
        return (
            <Form className="row">
                {columns.map((column) => {
                    if(column.title !== "actions"){
                        if(column.inputType === "textarea") {
                            return (
                                <Form.Group className="col-12 mb-3">
                                    <Form.Label className="mb-2">{column.title}</Form.Label>
                                    <Form.Control name={column.title}  onChange={onChange} as="textarea" placeholder={`Insert the ${column.title}`} />
                                </Form.Group>
                            )
                        } else if(column.inputType === "select" ) {
                            return (
                                <Form.Group as={Col} className="col-6 mb-3" >
                                    <Form.Label className="mb-2">{column.title}</Form.Label>
                                    <Form.Select name={column.title} onChange={onChange} className="form-control">
                                        <option value="default">Choose a category</option>
                                        {column.list.map(itemList => {
                                            return (
                                                <option value={itemList.id}>
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
                                    <Form.Label className="mb-2">{column.title}</Form.Label>
                                    <Form.Control 
                                        name={column.title}  
                                        onChange={onChange} 
                                        step={1 } 
                                        type={column.inputType} 
                                        placeholder={`Insert the ${column.title}`} />
                                </Form.Group>
                            )
                        }
                    }
                })}
                <Col className="d-flex justify-content-end mt-4">
                    <UIButton elementoHtml={"button"} className={"btn-outline-danger mr-4"} text={"Cancel"} onClick={() => fn()} />
                    <UIButton elementoHtml={"button"} className={"btn-success"} text={"Confirm"} onClick={(e) =>{e.preventDefault(); save(e)}} />
                </Col>
            </Form>
        )
    }

    const onChange = (e) => {
        const newEntity = {...entity}
        newEntity[e.target.name] = e.target.value ? e.target.value : null
        e.target.classList.remove("input-empty")
        setEntity(newEntity)
    }

    const save = () => {
        if(!entity){
            Alert.Warning({message: "Values cannot be empty"})
            return
        }

        columns.map( column => {
            if(column.name !== "actions" && column.required && !entity[column.name]){
                document.querySelector(`[name=${column.name}]`).classList.add("input-empty");
                return
            }
        })

        entity["category"] = { id: Number(entity["category"]) };
        entity["quantity"] = parseInt(entity["quantity"])
        entity["price"] = parseFloat(entity["price"])
        entity["user_creator"] = { id: Auth.getUserId() }

        console.log(entity)

        // API.post({url: urlController, body: entity })
        //     .then(() => {
        //         Alert.Success();
        //     })
        //     .catch(e => {
        //         Alert.Failed({message: e.message});
        //     })
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