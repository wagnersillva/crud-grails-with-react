import React, { useEffect, useState } from 'react'
import { RenderColumn } from './RenderColumn';

const TableBody = ({ paramsColmuns, data, contextTitle }) => {

    const [entity, setEntity] = useState();
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        if(data) setEntity(data)
        if(paramsColmuns) setColumns(paramsColmuns)
    }, [data, paramsColmuns])

    return (
        <tbody>
            {entity && entity.map((entity, index) => {
                return (
                    <tr key={index}>
                        {columns && columns.map((column, index) => {
                            if(!column.tableDisabled){
                                return (
                                    <RenderColumn 
                                        contextTitle={contextTitle}
                                        entity={entity}
                                        column={column}
                                        index={index}
                                        allColumns={columns}
                                    />
                                )
                            }
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}

export  default TableBody;