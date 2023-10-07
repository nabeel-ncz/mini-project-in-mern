import React from 'react'
import { useDispatch } from 'react-redux';
import { adminLogoutAction, userLogoutAction } from '../../store/redux';
import { useNavigate } from 'react-router-dom';

function LogoutButton({role}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserLogout = () => {
        dispatch(userLogoutAction());
        navigate('/register', { replace: true })
    }
    const handleAdminLogout = () => {
        dispatch(adminLogoutAction());
        navigate('/admin/auth', {replace: true });
    }

    return (
        <>
            <button onClick={role === "user" ? handleUserLogout : handleAdminLogout} className='px-6 py-2 bg-black text-white'>Logout</button>
        </>
    )
}

export default LogoutButton