import React from "react"
import UIButton from "../../../components/button"
import CustomModal from "../../../components/modal"

export const ModalView = ({ show, onHide, props, contextTitle }) => {

    const ENUM_ROLES = {
        "ROLE_ADMIN":"Admin",
        "ROLE_USER": "User"
    }

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
                    // console.log(column)
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
                                        { column.label  || column.title || '' }
                                    </label>
                                    {column.list && column.list.map((itemList)=>{
                                        if(column.title === "enabled"){
                                            if(props.entity &&   props.entity[column.title] === itemList.id){
                                                return (
                                                    <input className="form-control" id={`label-${column.title}`} type={column.inputType} disabled value={props.entity[column.title] ? "Active": "Inactive"} />
                                                 )
                                            }
                                        } else {
                                            if(props.entity &&   props.entity[column.title][0].name === itemList.id){
                                                return (
                                                    <input className="form-control" id={`label-${column.title}`} type={column.inputType} disabled value={ ENUM_ROLES[itemList.id] } />
                                                 )
                                            }
                                        }
                                    })}
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