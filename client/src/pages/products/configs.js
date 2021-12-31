import { Space } from 'antd'
import React from 'react'
import { NumberCurrency } from '../../components/UINumbers/NumberCurrency'


export const columns = [
    {
        title: "name",
        dataIndex: "name",
        inputType: "text",
        classNameInput:"col-6 mb-4",
        required: true,
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name), sortDirections: ['descend', 'ascend']
    },
    {
        title: "quantity",
        inputType: "number",
        inputNumber: "numberInt",
        classNameInput:"col-6 mb-4",
        key: "quantity",
        width: 100,
        required: true,
        dataIndex: "quantity"
    },
    {
        title: "cod_product",
        inputType: "text",
        classNameInput:"col-6 mb-4",
        key: "cod_product",
        width: 100,
        required: true,
        dataIndex: "cod_product"
    },
    {
        title: "price",
        inputType: "number",
        classNameInput:"col-6 mb-4",
        inputNumber: "numberFloat",
        dataIndex: "price",
        width: 100,
        required: true,
        key: "price",
        render: number => NumberCurrency({ value: number })
    },
    {
        title: "category",
        inputType: "select",
        width: 250,
        required: true,
        classNameInput:"col-6 mb-4",
        list: [],
        render: (data) =>(
            <>
                <Space size="middle">
                    <a>{data.category ? data.category.name :''}</a>
                </Space>
            </>
        )
    },
    {
        title: "description",
        name: "description",
        inputType: "textarea",
        required: false,
        width: 250,
        classNameInput:"col-12 mb-4",
        key: "description",
        dataIndex: "description",
    }
]