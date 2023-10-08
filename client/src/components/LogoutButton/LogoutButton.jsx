import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { adminLogoutAction, userLogoutAction } from '../../store/redux';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../CustomModal/CustomModal';

function LogoutButton({ role, text_color, bg_color }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleUserLogout = () => {
        dispatch(userLogoutAction());
        navigate('/register', { replace: true })
    }
    const handleAdminLogout = () => {
        dispatch(adminLogoutAction());
        navigate('/admin/auth', { replace: true });
    }

    const handleModal = () => {
        setOpen(true);
    }

    return (
        <>
            <button onClick={handleModal} className={`px-6 py-2 ${text_color} ${bg_color}`}>Logout</button>
            <CustomModal handleLogout={role === "user" ? handleUserLogout : handleAdminLogout}
            open={open} setOpen={setOpen} />
        </>
    )
}

export default LogoutButton