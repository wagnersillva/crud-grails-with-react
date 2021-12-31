import React from 'react'
import "./style.css"
import logo from  "../../images/logo-sidebar.svg"
import  RenderNav  from './renderNav'


const Sidebar = (props) => {
    return (
        <div className={`sidebar theme--${props.theme}`}>
            <div className = "sidebar-logo">
                <img src={logo} />
            </div>
            <nav className="sidebar-nav">
                {RenderNav()}
            </nav>
        </div>
    )
}

export default Sidebar;