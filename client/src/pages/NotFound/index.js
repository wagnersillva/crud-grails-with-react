import React from 'react'
import { Result, Button } from 'antd';
import "./style.css"

export default function NotFound(){
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, page not found."
            extra={[
                <Button type="primary">Back Home</Button>
            ]}
        />
    )
} 