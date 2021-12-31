import React from 'react'
import Modal from 'react-bootstrap/Modal'

export const ModalFooter = ({ children }) => {
    return (
        <Modal.Footer>
            {children}
        </Modal.Footer>
    )
}