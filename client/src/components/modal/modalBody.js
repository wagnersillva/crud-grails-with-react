import React from 'react'
import Modal from 'react-bootstrap/Modal'

export const ModalBody = ({ children }) => {
    return (
        <Modal.Body>
            {children}
        </Modal.Body>
    )
}