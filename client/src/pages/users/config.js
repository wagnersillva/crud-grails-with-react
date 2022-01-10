import { Space, Tag } from "antd";
import React from "react";

const ENUM_ROLES = {
    "ROLE_ADMIN" : "Admin",
    "ROLE_USER" : "User",
}

const listRoles = [
    { id:"ROLE_ADMIN", name: "Admin"}, 
    { id:"ROLE_USER", name: "User" }
]

export const columns = [
    {
        title: "username",
        name: "username",
        dataIndex: "username",
        inputType: "text",
        classNameInput:"col-6 mb-4",
        required: true,
        key: "username",
        sorter: (a, b) => a.username.localeCompare(b.username), sortDirections: ['descend', 'ascend']
    },
    {
        title: "roles",
        name: "roles",
        inputType: "select",
        classNameInput:"col-6 mb-4",
        width: 100,
        key: "roles",
        list: listRoles,
        dataIndex: "roles",
        render: (Roles) => (
            <Space>
                {Roles.map(role => ENUM_ROLES[role.name] )}
            </Space>
        )
    },
    {
        title: "enabled",
        name: "enabled",
        label: "status",
        inputType: "select",
        classNameInput:"col-6 mb-4",
        width: 100,
        key: "enabled",
        list: [{ id: true, name: "active" }, { id: false, name: "inactive" }],
        dataIndex: "enabled",
        render: tag => (
            <Tag style={{ borderRadius: "4px", marginLeft: "4px" }} color={tag ? 'green' : 'volcano'} key={tag}>
                {tag ? 'active' : 'inactive '}
            </Tag>
          )
    }
]
