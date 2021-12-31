import React, { useState } from "react"
import { RenderModal } from "./Modal/RenderModal";

export const RenderColumn = ({entity, column, index, allColumns, contextTitle}) =>{

    const [showModal, setShowModal] = useState();
    const [props, setProps] = useState();

    if(column.name === "actions") {
        return (
            <>
                <td className="actons-table d-flex justify-content-center">
                    {column.actions && column.actions.map((action, index) => {
                        return (
                            <span key={index} onClick={() =>{setShowModal(true); setProps({ type: action.method, entity, allColumns, service: column.service })}}>
                                {action.icon}
                            </span>
                        )
                    })}
                </td>
                <RenderModal 
                    contextTitle={contextTitle}
                    show={showModal}
                    onHide={()=> setShowModal(false)}
                    props={props}
                />
            </>
        )
    } else {
        if(column.inputType && column.inputType === "select"){
            return (
                <td key={index}>
                    {entity[column.name].name}
                </td>
            )
        }else {
            return (
                <td key={index}>
                    {entity[column.name]}
                </td>
            )
        }
    }
}