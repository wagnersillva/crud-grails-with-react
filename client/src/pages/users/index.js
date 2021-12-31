import React, { useEffect, useState } from "react";
import { columns } from "./config"
import { calculateTotalPage } from '../../tools/totaPages';
import { API } from "../../services/server"
import { UIInput } from "../../components/Input";
import UIButton from "../../components/button";
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Space, Table } from "antd";
import { RenderModal } from "./Modal/RenderModal";

export default function Users (){
    const [showModal, setShowModal] = useState(false);
    const [propsModal, setPropsModal] = useState(0);
    const [getColumns, setColumns] = useState();
    const [users, setUsers] = useState(null);
    const [offset, setOffset] = useState(0);
    const [queryParam, setQueryParam] = useState();
    const [max, setMax] = useState(5);
    const [totalPages, setTotalPages] = useState();
    const [urlController] = useState(`user`);

    const EnumOrder = {
        descend: "desc",
        ascend: "asc"
    }

    useEffect(() => {       
        setData({max, offset, query: queryParam});
        const actions = {
            title: "actions", key: "actions", urlController: "products", width: 100,
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
    }, [])

    const setData = ({max, offset, query }) => {
        const model = []
        const url = `${urlController}?${ max ? `max=${max}`:""}${ offset ? `&offset=${offset*max}`:""}${ query ? `${query}`:""}`
        API.get({ url })
        .then(e => { 
            const users = e.success ? e.data.data : null;
            if(e.success) {
                setTotalPages(e.data.totalPages)
                setUsers(users)
            } else {
                setUsers(false)
            }
        });
    }


    const onChangeSearch = (e) => {
        const query = `name=${e.target.value}`
        setQueryParam(query)
        setData({ query })
    }

    const onChangeTable = (pagination, filters, sorter, extra) => {
        let query = sorter ? `${sorter.field ? `&sort=${sorter.field}`:""}${EnumOrder[sorter.order] ? `&order=${EnumOrder[sorter.order]}` : ""}` : ''
        let page = extra.action === "paginate" ? pagination.current-1 : 0
        setQueryParam(query)
        setOffset(page)
        setData({max, offset: page, query })
    }

    const handleShowModal = () => setShowModal(true)
    const handleHideModal = () => setShowModal(false)

    return (
        <>
            <div className="row mx-1">
                <div className="col-8 pl-0" style={{ marginLeft: "-4px" }}>
                <UIInput
                    type="search"
                    placeholder="Search a user..."
                    onChange={onChangeSearch}
                /> 
                </div>
                <div className="row col justify-content-end">
                    <UIButton className={"success"} text="Add user" onClick={() =>{ setPropsModal({ type: "edit", entity: null, allColumns: getColumns, service: urlController }); handleShowModal();}}/>
                </div>
            </div>
            
            <Table 
                onChange={ onChangeTable } 
                columns={ getColumns } 
                dataSource={ users ? users : null } 
                pagination={{ current: offset+1, pageSize: max, total: totalPages  }}
                className='mt-4' 
                loading={ users === null  }
                bordered 
            />
            <RenderModal 
                contextTitle={"Products"}
                show={showModal}
                onHide={handleHideModal}
                props={propsModal}
            />
        </>
    )

}