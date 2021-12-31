import React, { useEffect, useState } from 'react'
import { Form } from "react-bootstrap";
import "./style.css"

export const UIInput = ({type, label, className, classNameInput, valueSelected, size, onChange, options, ...restProps}) => {
    if(type === "search") {
        return (
            <div className={`input-search ${className ? className : ''}`}>
                <input className={`form-control`} type="text"  onChange={onChange} {...restProps} />
            </div>
        )
    }
    if( type === "text" ) { 
        return (
            <>
                {label && <Form.Label className="mb-2">{label}</Form.Label>}
                <input className={`${classNameInput && classNameInput}`}  onChange={onChange} {...restProps} />
            </>            
        )
    }
    if( type === "radio" ) { 
        return (
            <>
                <Form.Check  type={type} id="custom-switch" label={label} onChange={onChange} {...restProps} />
            </>            
        )
    }
    if( type === "numberFloat" || type === "numberInt" ) { 
        return (
            <>
                {label && <Form.Label className="mb-2">{label}</Form.Label>}
                <input 
                    type="number"
                    className={`${classNameInput && classNameInput}`}
                    pattern={ type === "numberInt" ? "^[\d]+$" : "[0-9]+([\.,][0-9]+)?" }
                    step={ type === "numberInt" ? 1 : 0.01 }
                    min={0} 
                    onChange={onChange} 
                    {...restProps} 
                />
            </>
        )     
    }  
    if( type === "textarea" ) { 
        return (
            <>
                {label && <Form.Label className="mb-2">{label}</Form.Label>}
                <Form.Control  className={`${classNameInput && classNameInput}`}  onChange={onChange} as="textarea" {...restProps} />
            </>
        ) 
     }

    return (
        <div>{type}</div>
    )
}

