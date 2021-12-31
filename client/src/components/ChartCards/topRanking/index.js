import React from "react"
import Table from 'react-bootstrap/Table'
import "./style.css"

export const TopRanking = ({ data }) => {
    if(data && data.length){
        return (
            <Table className="top-ranking"  hover size="sm">
                <thead>
                    <tr>
                        <th>Top</th>
                        <th>Username</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( (item, index) => {
                        return (
                            <tr className="item-ranking">
                                <td>{`${index}°`}</td>
                                <td>{item.name}</td>
                                <td> {item.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    } else { return null }
}
