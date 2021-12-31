import React from 'react';
import "./style.css";
import Table from 'react-bootstrap/Table';
import TableBody  from './TableBody';
import TableHead  from './TableHead';

const CustomTable = ({ columns,  data, contextTitle }) => {
    return (
        <Table responsive striped>
            <TableHead paramsColmuns={columns} />
            <TableBody  paramsColmuns={columns} data={data}  contextTitle={contextTitle}/>
        </Table>
    )
}

export default CustomTable;