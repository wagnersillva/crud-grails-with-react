import React from "react"
import { ModalDelete } from "../../../components/modal/ModalDelete"
import { ModalEdit } from "../../../components/modal/ModalEdit"
import { ModalView } from "./ModalView"

export const RenderModal = ({show, onHide, props,contextTitle}) => {
    const newProps = {...props};
    const {entity, type } = newProps

    // if(props && type === "edit") {
    //     if(props && entity && Object.keys(entity).includes("productsList")) delete entity.productsList
    //     return  <ModalEdit contextTitle={contextTitle} show={show} onHide={onHide} props={props}  />
    // }
    // if(props && type === "delete") {
    //     return <ModalDelete contextTitle={contextTitle} show={show} onHide={onHide} props={props}  />
    // }
    // if(props && type === "edit") {
    //     if(props && entity && Object.keys(entity).includes("productsList")){
    //         entity.productsList = 
    //     }
    //     return  <ModalEdit contextTitle={contextTitle} show={show} onHide={onHide} props={props}  />
    // }

    

    // console.log("%c props no rendermodal", "color:white;background:green")
    // if(entity && entity.productsList) { entity.productsList = entity.productsList.length  }
    // console.log(entity && entity)

    return (
        newProps && type  === "edit" ?
                <ModalEdit contextTitle={contextTitle} show={show} onHide={onHide} props={newProps}  /> :
                newProps && type  === "view" ? 
                <ModalView contextTitle={contextTitle} show={show} onHide={onHide} props={newProps}  /> :
                newProps && type  === "delete" ? 
                <ModalDelete contextTitle={contextTitle} show={show} onHide={onHide} props={newProps}  /> : null
    )
}