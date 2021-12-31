import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { ModalBody } from './modalBody'
import { ModalFooter } from './modalFooter'
import { ModalHeader } from './modalHeader'
import "./style.css"

const toggleClassAtBody = (show) => {
    if(!show){
        document.querySelector("body").classList.remove("modal-open")
    } else {
        document.querySelector("body").classList.add("modal-open")
    }
}

const CustomModal = ({ show, onHide, header, body, footer, contextTitle, callBack}) => {
    
    toggleClassAtBody(show)

    if(callBack){
        callBack()
    }

    return (
        <Modal
            show={show} 
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName='CustomModal'
        >
            {header && <ModalHeader children={header}  contextTitle={contextTitle} closeButton={true} onHideClick={onHide}/>}
            <ModalBody children={body}/>
            {footer && <ModalFooter children={footer}/>}
            
        </Modal>
    )
}


export default CustomModal;