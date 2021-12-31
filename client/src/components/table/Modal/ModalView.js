import React from "react"
import UIButton from "../../button";
import CustomModal from "../../modal"

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
                    if(column.name !== "actions"){
                        if(column.inputType === "textarea") {
                            return(
                                <div key={index} className="col-12 form-group">
                                    <label htmlFor={`label-${column.name}`} className=" mb-2">
                                        {column.name}
                                    </label>
                                    <textarea value={props.entity[column.name]} className="form-control" id={`label-${column.name}`} disabled /> 
                                </div>
                            )
                        } else if(column.inputType === "select") {
                            return(
                                <div key={index} className="col-6 form-group">
                                    <label htmlFor={`label-${column.name}`} className=" mb-2">
                                        {column.name}
                                    </label>
                                    <input className="form-control" id={`label-${column.name}`} type={column.inputType} disabled value={props.entity[column.name].name} />
                                </div>
                            )
                        } else {
                            return(
                                <div key={index} className="col-6 form-group">
                                    <label htmlFor={`label-${column.name}`} className=" mb-2">
                                        {column.name}
                                    </label>
                                    <input className="form-control" id={`label-${column.name}`} type={column.inputType} disabled value={props.entity[column.name]} />
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