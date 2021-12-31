<Form className="row" onSubmit={(e) => save(e)}>
                  {props.allColumns.map((column) => {
                     if(column.title !== "actions"){
                         if(column.inputType === "textarea") {
                             return (
                                 <Form.Group className="col-12 mb-3">
                                     <Form.Label className="mb-2">{column.title}</Form.Label>
                                     <Form.Control name={column.title} value={entity ? entity[column.title] : null}  onChange={onChange} as="textarea" placeholder={`Insert the ${column.title}`} />
                                 </Form.Group>
                             )
                         } else if(column.inputType === "select"){
                             return (
                                 <Form.Group as={Col} className="col-6 mb-3">
                                     <Form.Label className="mb-2">{column.title}</Form.Label>
                                     <Form.Select onChange={onChangeSelect}  name={column.title} className="form-control">
                                         {column.list.map(itemList => {
                                             return (
                                                 <option  value={itemList.id} selected={ entity && itemList.id === entity[column.title].id } >
                                                     {itemList.name}
                                                 </option>
                                             )
                                         })}
                                     </Form.Select>
                                 </Form.Group>
                             )
                         } else if(column.inputType === "number"){
                             return (
                                 <Form.Group className="col-6 mb-3">
                                     {/* <UIInput  onChange={onChangeNumber} value={entity[column.title]} style={{ width: "100%" }} type={ column.inputNumber === "int" ? "numberInt" : "numberFloat"} />  */}
                                        <Form.Label className="mb-2">{column.title}</Form.Label>
                                        <Form.Control 
                                            name={column.title} 
                                            value={entity && entity[column.title] } 
                                            onChange={onChangeNumber} 
                                            pattern= { column.inputNumber === "int" ? "^[\d]+$" : "[0-9]+([\.,][0-9]+)?" }
                                            step={ column.inputNumber === "int" ? 1 : 0.01 }
                                            type={column.inputType} 
                                            placeholder={`Insert the ${column.title}`} /> 
                                  </Form.Group>   
                             )
                         } else {
                             return (
                                 <Form.Group className="col-6 mb-3">
                                     <Form.Label className="mb-2">{column.title}</Form.Label>
                                     <Form.Control name={column.title} value={entity && entity[column.title]} onChange={onChange} type={column.inputType} placeholder={`Insert the ${column.title}`} />
                                 </Form.Group>
                             )
                         }
                     }
                 })} 
                  <Col className="d-flex justify-content-end mt-4 col-12">
                      <UIButton elementoHtml={"button"} className={"btn-outline-danger mr-4"} text={"Cancel"} onClick={(e) => {e.preventDefault();  fn()}} />
                      <UIButton elementoHtml={"button"} type="submit" className={"btn-success"} text={"Confirm"}  />
                  </Col>
              </Form>