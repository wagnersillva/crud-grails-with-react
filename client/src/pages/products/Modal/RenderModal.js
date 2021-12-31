import React from "react"
import { ModalDelete } from "../../../components/modal/ModalDelete"
import { ModalEdit } from "../../../components/modal/ModalEdit"
import { ModalView } from "../../../components/modal/ModalView"

export const RenderModal = ({show, onHide, props,contextTitle}) => {

    if(props && props.entity && props.entity.category && props.entity.category.products) delete props.entity.category.products

    if(!props) return null

    return (
        props && props.type  === "edit" ?
                <ModalEdit contextTitle={contextTitle} show={show} onHide={onHide} props={props}  /> :
                props && props.type  === "view" ? 
                <ModalView contextTitle={contextTitle} show={show} onHide={onHide} props={props}  /> :
                props && props.type  === "delete" ? 
                <ModalDelete contextTitle={contextTitle} show={show} onHide={onHide} props={props}  /> : null
    )
}