import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Auth } from '../../services/security/auth';
import { currenPath } from '../../tools/currentPath';
import { SidebarData  }  from './SidebarData'

const RenderNav = () => {
    const [currentPath, setCurrentPath] = useState(currenPath())
    const isEqual = ({title, currentPath}) => title.toLowerCase() === currentPath.toLowerCase();

    const isAdmin = () => {
        const ROLE = Auth.getRole()
        return ROLE && ROLE.includes('ROLE_ADMIN') ? true : false
    }

    return (
        <ul className="sidebar-group-items">
            {SidebarData.map(( item, index ) => {
                if(item.protected && !isAdmin()) return
                return (
                    <li onClick={() =>{
                            setCurrentPath(currenPath())
                        }} 
                        key={index} 
                        className={`nav-item ${isEqual({ currentPath, title: item.title }) ? 'nav-active ':''}${item.className ? item.className : ''}`}
                    >
                        <Link to={item.link}>
                            <i> {item.icon} </i>
                            <span> {item.title}  </span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default RenderNav;