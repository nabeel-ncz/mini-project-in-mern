import React from 'react';
import { Link } from "react-router-dom"

function RegisterButton({role}) {
    return (
        <Link to={`${role === "user" ? "/register" : "/admin/auth"}`}>
            <button className='px-6 py-2 bg-black text-white'>Register</button>
        </Link>
    )
}

export default RegisterButton