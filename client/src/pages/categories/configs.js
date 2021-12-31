import { Space } from "antd"
import React from "react"

export const columns = [
    {
        title: "name",
        dataIndex: "name",
        key: "name",
        inputType: "text",
        required: true,
        sorter: (a, b) => a.name.localeCompare(b.name), sortDirections: ['descend', 'ascend']
    },{
        title: "Total Products",
        key: "products",
        viewType: "arrayList",
        viewUrl: "products",
        dataIndex: "products",
        render: (data) =>(
            <>
                <Space size="middle">
                    <a>{data && data.length}</a>
                </Space>
            </>
        )
    }
]