import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Auth } from "../../services/security/auth";
import "./style.css"

export default function UserConfig (props) {

    const [configBox, setConfigBox] = useState(false)
    const name = Auth.getUserName();

    const changeConfigBox = () => {
        if(configBox) setConfigBox(false)
        else setConfigBox(true)
    }

    return (
        <>
            <div className={`user-config theme--${props.theme || ""}`}>
                <span className="user-config-name">
                    {name}
                </span>
                <span onClick={() => changeConfigBox()} className="user-config-icon">
                    <FaIcons.FaUserCircle />
                </span>
                <div  className={`user-config-box ${configBox ? "--open" : "--close"}`}>
                    {/* <a href={"/config"}>
                        Config
                    </a> */}
                    <a href={"/logout"}>
                        Logout
                    </a>
                </div>
            </div>
        </>
    )

}