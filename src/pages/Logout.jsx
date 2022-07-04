import React from "react";
import { Navigate } from 'react-router-dom'

function Logout() {
    function del() {
        sessionStorage.removeItem("USER_NAME_SESSION_ATTRIBUTE_NAME")
        sessionStorage.removeItem("USER_AUTHORIZATION")
    }

    return (
        <div>
            {del()}
            <Navigate replace to="/" />
        </div>
    )
}

export default Logout;
