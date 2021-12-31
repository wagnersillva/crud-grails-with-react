import React from "react"
import { Dropdown } from "react-bootstrap";
import UIButton from "../../../components/button";
import CustomModal from "../../../components/modal"

export const ModalView = ({ show, onHide, props, contextTitle }) => {

    const renderHeader = () => {
        if(contextTitle){
            return (
                <>
                    <span>{contextTitle} - View</span>
                </>
            )
        }else {
            return (
                <span>View</span>
            )
        }
    }

    const renderBody = () => {
        return (
            <div className="row">
                {props.allColumns.map((column, index) => {
                    if(column.title !== "actions"){
                        if(column.inputType === "textarea") {
                            return(
                                <div key={index} className="col-12 form-group">
                                    <label htmlFor={`label-${column.title}`} className=" mb-2">
                                        {column.title}
                                    </label>
                                    <textarea value={props.entity[column.title]} className="form-control" id={`label-${column.title}`} disabled /> 
                                </div>
                            )
                        } else if(column.inputType === "select") {
                            return(
                                <div key={index} className="col-6 form-group">
                                    <label htmlFor={`label-${column.title}`} className=" mb-2">
                                        {column.title}
                                    </label>
                                    <input className="form-control" id={`label-${column.title}`} type={column.inputType} disabled value={props.entity[column.title].name} />
                                </div>
                            )
                        } else if(column.viewType === "arrayList") {
                            return(
                                <div key={index} className="col-6 form-group">
                                    <label htmlFor={`label-${column.title}`} className=" mb-2">
                                        {column.title}
                                    </label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {column.title && column.title}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {props.entity[column.dataIndex] && props.entity[column.dataIndex].map( item => {
                                            return (
                                                <Dropdown.Item href={`${column.viewUrl}/${item.id}`}> {item.name} </Dropdown.Item>
                                            )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            )
                        } else {
                            return(
                                <div key={index} className="col-6 form-group">
                                    <label htmlFor={`label-${column.title}`} className=" mb-2">
                                        {column.title}
                                    </label>
                                    <input className="form-control" id={`label-${column.title}`} type={column.inputType} disabled value={props.entity[column.title]} />
                                </div>
                            )
                        }
                    }
                    
                })}
            </div>
        )
    }

    const renderFooter = (fn) => {
        return (
            <UIButton text="Close" className={'btn-outline-danger'} onClick={() => fn()}/>
        )
    }

    return (
        <CustomModal
            show={show} 
            onHide={onHide}
            header = {renderHeader()}
            body={renderBody()}
            footer= {renderFooter(onHide)}
        />
    )
}