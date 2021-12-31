import React from 'react';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
    {
        title: "Dashboard",
        link: "/dashboard",
        protected: true,
        role: "ROLE_ADMIN",
        icon: <FaIcons.FaChartPie />
    },
    {
        title: "Users",
        link: "/users",
        protected: true,
        role: "ROLE_ADMIN",
        icon: <FaIcons.FaUserFriends />
    },
    {
        title: "Products",
        link: "/products",
        icon: <FaIcons.FaBoxes />,
        className: "adicional-teste"
    },
    {
        title: "Categories",
        link: "/categories",
        icon: <FaIcons.FaList  />
    }
]