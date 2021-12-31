import React from 'react'
import "./style.css"

const ThemeButton = (props) => {
    return (
        <>
            <div className={`toggle-theme theme--${props.theme}`}>
                <div className={`btn-theme`} onClick={props.changeTheme}>
                </div>
            </div>
        </>
    )
}


export default ThemeButton;