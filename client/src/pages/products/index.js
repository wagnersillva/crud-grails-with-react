import React, { useEffect, useState } from 'react'
import { UIInput } from '../../components/Input';
import UIButton from '../../components/button';
import { API } from '../../services/server'
import { columns } from './configs';
import { Space, Table } from 'antd';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { RenderModal } from './Modal/RenderModal';

export default function Products() {

    const [products, setProducts] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [propsModal, setPropsModal] = useState(0);
    const [categories, setCategories] = useState([]);
    const [getColumns, setColumns] = useState();
    const [offset, setOffset] = useState(0);
    const [max] = useState(5);
    const [queryParam, setQueryParam] = useState();
    const [totalPages, setTotalPages] = useState();
    const [urlController] = useState(`products`);

    const EnumOrder = {
        descend: "desc",
        ascend: "asc"
    }


    useEffect( () => {
        setData({max, offset, query: queryParam});
        const actions = {
            title: "actions", key: "actions", urlController: "products",  width: 100,
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
        // eslint-disable-next-line
    }, []);

    const setData = ({max, offset, query }) => {
        const url = `${urlController}?${ max ? `max=${max}`:""}${ offset ? `&offset=${offset*max}`:""}${ query ? `&${query}`:""}`
        console.log(max)
        API.get({ url })
        .then(e => { 
            const products = e.success ? e.data.data : null;
            if(e.success) setTotalPages(e.data.totalPages)
            if(products) {
                API.get({ url: "categories"  }).then(e => {
                    if(e.success){
                        const categories = e.data.data;
                        // eslint-disable-next-line
                        products.map( product => {
                            product.category = categories.find(category => category.id === product.category.id);
                        })
                        // eslint-disable-next-line
                        columns.map( column => {
                            if(column.title === "category") { column.list = categories; }
                        })
                    setCategories(categories)
                    setProducts(products)
                    } else {
                        setProducts(false)
                    }
                })
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
                    placeholder="Search a category..."
                    onChange={onChangeSearch}
                /> 
                </div>
                <div className="row col justify-content-end">
                    <UIButton className={"success"} text="Add Product" onClick={() =>{ setPropsModal({ type: "edit", entity: null, allColumns: columns, service: urlController }); handleShowModal();}}/>
                </div>
            </div>
            
            <Table 
                onChange={ onChangeTable } 
                columns={ getColumns } 
                dataSource={ products ? products : null } 
                pagination={{ current: offset+1, pageSize: max, total: totalPages }}
                className='mt-4' 
                loading={ products === null }
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