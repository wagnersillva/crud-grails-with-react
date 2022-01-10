import React from "react"
import { ModalDelete } from "../../../components/modal/ModalDelete"
import { ModalEdit } from "../../../components/modal/ModalEdit"
import { ModalView } from "./ModalView"

export const RenderModal = ({show, onHide, props,contextTitle}) => {
    const newProps = {...props};
    const { type } = newProps

    return (
        newProps && type  === "edit" ?
                <ModalEdit contextTitle={contextTitle} show={show} onHide={onHide} props={newProps}  /> :
                newProps && type  === "view" ? 
                <ModalView contextTitle={contextTitle} show={show} onHide={onHide} props={newProps}  /> :
                newProps && type  === "delete" ? 
                <ModalDelete contextTitle={contextTitle} show={show} onHide={onHide} props={newProps}  /> : null
    )
}