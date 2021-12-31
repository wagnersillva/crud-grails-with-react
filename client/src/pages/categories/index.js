import React, { useEffect, useState } from 'react'
import { UIInput } from '../../components/Input';
import UIButton from '../../components/button';
import { API } from '../../services/server'
import { columns } from './configs';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { calculateTotalPage } from '../../tools/totaPages';
import { Space, Table } from 'antd';
import { RenderModal } from './Modal/RenderModal';

export default function Categories() {
    const [showModal, setShowModal] = useState(false);
    const [propsModal, setPropsModal] = useState(0);
    const [categories, setCategories] = useState(null);
    const [getColumns, setColumns] = useState();
    const [offset, setOffset] = useState(0);
    const [max, setMax] = useState(5);
    const [totalPages, setTotalPages] = useState();
    const [urlController] = useState("categories")

    
    const EnumOrder = {
        descend: "desc",
        ascend: "asc"
    }

    useEffect(() => {

        const actions = {
            title: "actions", key: "actions", urlController: "categories", width: 100,
            render: (data) => (
                <Space size="middle">
                    <span className='cursor-pointer' onClick={() =>{ setPropsModal({ type: "edit", entity: data, allColumns: columns, service: urlController }); handleShowModal() } }>
                            {<FaEdit />}
                    </span>
                    <span className='cursor-pointer' onClick={() =>{ setPropsModal({ type: "view", entity: data, allColumns: columns, service: urlController }); handleShowModal() }}>
                        {<FaEye />}
                    </span>
                    <span className='cursor-pointer'  onClick={() =>{ setPropsModal({ type: "delete", entity: data, allColumns: columns, service: urlController });  handleShowModal()  }}>
                        {<FaTrash />}
                    </span>
                </Space>
            )      
        }
        setColumns([...columns, actions])
        setData({max, offset});
    }, []);

    const setData =  ({max, offset, query }) => {
        const url = `${urlController}?${ max ? `max=${max}`:""}${ offset ? `&offset=${offset*max}`:""}${ query ? `&${query}`:""}`
        API.get({ url })
        .then(e => { 
            const categoriesData = e.success ? e.data.data : null;
            if(e.success) {
                setTotalPages(calculateTotalPage({ max, total: e.data.total }))
                setCategories(categoriesData);
            } else {
                setCategories(false)
            }
        });
    }

    const onChangeSearch = (e) => {
        const query = `name=${e.target.value}`
        setData({ query })
    }
    const pagination = () => { return { defaultCurrent: offset+1, pageSize: max, total: totalPages } }

    const onChangeTable = (pagination, filters, sorter, extra) => {
        const query = `${sorter.field ? `&sort=${sorter.field}`:""}${EnumOrder[sorter.order] ? `&order=${EnumOrder[sorter.order]}` : ""}`

        if(pagination) setOffset(pagination.current-1)
        
        setData({max, offset: pagination.current-1, query: query.sql })
    }
    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);


    return (

        <>
            <div className="row mx-1">
                <div className="col-8 pl-0">
                    <UIInput
                        type="search"
                        placeholder="Search a category..."
                        onChange={onChangeSearch}
                        style={{ marginLeft: "-4px" }}
                    /> 
                </div>
                <div className="row col justify-content-end">
                    <UIButton className={"success"} text="Add a Category" onClick={() =>{ setPropsModal({ type: "edit", entity: null, allColumns: columns, service: urlController }); handleShowModal();}}/>
                </div>
            </div>
            
            <Table
                onChange={onChangeTable} 
                columns={getColumns} 
                dataSource={categories}
                pagination={pagination()}
                loading={ categories === null }
                className='mt-4' 
                bordered />
            
            <RenderModal 
                contextTitle={"categories"}
                show={showModal}
                onHide={handleHideModal}
                props={propsModal}
            />

        </>
    )
}