import React from 'react';
import "./style.css";


const renderIcon = ({icon}) => {
    if(icon) {
        return (
            <i>
                {icon}
            </i>
        )
    }
}

const UIButton = ({elementoHtml: Component, text, className, icon, ...restProps}) => {
    Component = Component ? Component : "span";
    return (
        <Component className={`UiButton${className ? ` ${className}` : ''}`} {...restProps} >
            {renderIcon({icon})}
            <p>{text}</p>
        </Component>
    )
} 

export default UIButton;