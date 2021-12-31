import React from 'react'
import Alert from '../../components/alert'
import { Button, Modal } from 'antd'

export default function Home() {


    return (
        <>
            <Button onClick={modalRender} type="primary" size={'large'}>
                show notification
            </Button>
        </>
    )
}

function modalRender(){
    Modal.warning({
        content: (
            <h2>
                TEste
            </h2>
        )
    })
}