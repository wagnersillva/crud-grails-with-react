import React, { useEffect, useState } from "react"
import { API } from "../../../services/server"
import Alert from "../../alert";
import UIButton from "../../button";
import CustomModal from "../../modal"

export const ModalDelete = ({ show, onHide, props, contextTitle }) => {

    const [urlController, setUrlController] = useState();
    const [entity, setEntity] = useState();
    
    useEffect(() => {
        if(props.entity){
            setEntity(props.entity)
        }
        props.allColumns.map(column => {
            if(column.name === "actions") {
                setUrlController(column.urlController)
            }
        })
    }, [])

    const renderHeader = () => {
        if(contextTitle){
            return (
                <>
                    <span>{contextTitle} - Delete</span>
                </>
            )
        }else {
            return (
                <span>Delete</span>
            )
        }
    }
    const renderBody = () => {
        return (
            <>
                <h2>
                    Confirm to delete
                </h2>
            </>
        )
    }

    const renderFooter = (fn) => {
        return (
            <div className="d-flex">
                <UIButton text="Cancel" className={'btn-outline-danger mr-4'} onClick={() => fn()}/>
                <UIButton text="Confirme" className={'btn-success'} onClick={deleteData}/>
            </div>
        )
    }

    const deleteData = () => {
        API.delete({url: urlController, id: entity.id })
            .then(() => {
                Alert.Success();
            })
            .catch(e => {
                Alert.Failed({message: e.message});
            })
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