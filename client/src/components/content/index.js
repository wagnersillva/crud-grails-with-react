import React from 'react'
import './style.css';

const ContentPage = (props) => {
    return (
        <div className={`content-page theme--${props.theme}`}>
            <div className="container">
                {props.content}
            </div>
        </div>
    )
}

export default ContentPage;