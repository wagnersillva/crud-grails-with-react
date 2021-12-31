import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { FaTimes } from 'react-icons/fa'

export const ModalHeader = ({ children, closeButton, onHideClick }) => {
    return (
        <Modal.Header>
            <Modal.Title>
                {children}
            </Modal.Title>
            <div className={`btn-close-modal btn-close-modal${closeButton? "": "-off"}`} onClick={onHideClick}>
                {<FaTimes />}
            </div>
        </Modal.Header>
    )
}