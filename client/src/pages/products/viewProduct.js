import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Alert from '../../components/alert';
import UIButton from '../../components/button';
import { UIInput } from '../../components/Input';
import { API } from '../../services/server'
import { columns } from "./configs"

export const ViewProduct = () => {
    const [product, setProduct] = useState()
    const [categories, setCategories] = useState([])
    const url = "products"
    const { id } = useParams()
    
    useEffect(() => {
        API.get({ url, id }).then( e => {
            const product = e.success ? e.data.data : null;
            if(product) {
                API.get({ url: "categories"  }).then(e => {
                    if(e.success){
                        const categories = e.data.data;
                        product.category = categories.find(category => category.id === product.category.id);
                        columns.map( column => {
                            if(column.title === "category") { column.list = categories; }
                        })
                    setCategories(categories)
                    setProduct(product)
                    } else {
                        setProduct(false)
                    }
                })
            }
        })
    },[])

    const onChangeSelect = (e) => {
        const newEntity = {...product}
        const { value, options, name } = e.target
        newEntity[name] = {id: parseInt(value), name: options[options.selectedIndex].label}
        console.log(e.target)
        setProduct(newEntity)
    }

    const onChangeNumber = (e) => {
        const newEntity = {...product}
        const { value, name, validity: { valid }, id  } = e.target
        if(valid){
            newEntity[name] = id === "numberInt" ? parseInt(value) : parseFloat(value)
        }
        console.log(id)
        setProduct(newEntity)
    }
    const onChange = (e) => {
        const newEntity = {...product}
        const { value, name  } = e.target
        newEntity[name] = value
        setProduct(newEntity)
    }

    const verifyValues = (e) => {
        const errors = []
        if(!product){
            window.document.querySelectorAll(`.input-control-validate.is-require`).forEach( input => {
                input.classList.add("input-invalid")
            })
            window.document.querySelectorAll(`.label-control-validate.is-require`).forEach(label => {
                label.classList.add("input-invalid")
            })
            errors.push("error")
        } else {
            columns && columns.map( column => {
                const input = window.document.querySelector(`.input-control-${column.title}.is-require`)
                const label = window.document.querySelector(`.label-control-${column.title}.is-require`)
                if( product && column.title !== "actions" && column.required && !product[column.title]) {
                    errors.push(column.title)
                    input && input.classList.add("input-invalid")
                    label && label.classList.add("input-invalid")
                } else {
                    if(input){
                        input.classList.remove("input-invalid") 
                        input.classList.add("input-valid")
                    }
                    label && label.classList.remove("input-invalid")
                }
                 
             })
         }
        if(!errors.length) return true
    }

    const save = (e) => {
        e.preventDefault();
        if(verifyValues()){
            if(product.id){
                API.put({url: `${url}/update`, id: product.id, body: product })
                .then(() => {
                    Alert({ type: "success"})
                    setTimeout(() => {
                        window.location.href="/products"
                    }, 2500)
                })
                .catch(e => Alert({ type: 'error', message: e.message }) )
            }
        }
    }

    return (
        <>
            <h2>View product </h2>
            <Form className="row mt-4" onSubmit={save}>
                {columns.map( column => {
                    const { inputType, classNameInput, key, title, required, inputNumber, name } = column
                    if( inputType === "number" ){
                        return (
                            <Form.Group as={Col} className={classNameInput || ''}>
                                <UIInput classNameInput={`form-control ${required ? 'is-require':''} input-control-validate input-control-${title}`} value={product ? product[title] : ''} placeholder={`Insert the ${title}`} id={inputType} onChange={onChangeNumber} name={title} label={`${title}${required ? '*':''}`} type={inputNumber}/>
                                <span className={`${required ? 'is-require':''} label-control-validate label-control-${title}`}> {title} is required </span>
                            </Form.Group>
                        )  
                    }  else if( inputType === "select" ) {
                        return(
                            <Form.Group as={Col} className={classNameInput || ''} >
                            {title && <Form.Label className="mb-2">{title}</Form.Label>}
                            <Form.Select onChange={onChangeSelect} name={title} className={`form-control ${required ? 'is-require':''} input-control-validate input-control-${title}`}>
                                <option selected={ !product || !product[name] && true } disabled>
                                    Select {title}
                                </option>
                                {categories && categories.map(itemList => {
                                    return (
                                        <option  value={itemList.id} selected={ product && product[title] && product[title].id === itemList.id }  >
                                            {itemList.name}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                            <span className={`${required ? 'is-require':''} label-control-validate label-control-${title}`}> {title} is required </span>
                        </Form.Group>
)
                    } else {
                        return (
                            <Form.Group as={Col} className={classNameInput || ''}>
                                <UIInput classNameInput={`form-control ${required ? 'is-require':''} input-control-validate input-control-${title}`} value={product ? product[title] : ''} placeholder={`Insert the ${title}`} id={title} onChange={onChange} name={title} label={`${title}${required ? '*':''}`} type={inputType}/>
                                <span className={`${required ? 'is-require':''} label-control-validate label-control-${title}`}> {title} is required </span>
                            </Form.Group>
                        )  
                    }
                })}
                <Col className="d-flex justify-content-end mt-6 col-12">
                    <UIButton elementoHtml={"button"} type="submit" className={"btn-success"} text={"Update"}  />
                </Col>
            </Form>
        </>
    )


}