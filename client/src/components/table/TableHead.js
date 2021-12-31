import React, { useEffect, useState } from 'react'


const TableHead = ({ paramsColmuns }) => {

    const [columns, setColumns] = useState([]);

    useEffect(() => {
        if(paramsColmuns) setColumns(paramsColmuns);
    }, [])

    return (
        <thead>
            <tr>
            {columns.map((item, index) => {
                if(!item.tableDisabled) {
                    return (
                        <th key={index} className={`${item.className ? item.className : ''}`}>
                            {item.name}
                        </th>
                    )
                }
            })}
            </tr>
        </thead>
    )
}

export  default TableHead;