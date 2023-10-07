import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LogoutButton from '../LogoutButton/LogoutButton';
import RegisterButton from '../RegisterButton/RegisterButton';

function AdminNav() {
    const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

    return (
        <div className='w-full fixed top-0 bg-white flex items-center justify-center px-20 py-4'>
            <div className='w-full flex justify-between items-center'>
                <h4 className='font-bold text-lg'>
                    Admin.
                </h4>
                <ul className='flex items-center justify-center list-none gap-8'>
                    <li>About</li>
                    <li>Contact</li>
                    {isAuthenticated
                        ? <LogoutButton role="admin" />
                        : <RegisterButton role="admin" />
                    }
                </ul>
            </div>
        </div>
    )
}

export default AdminNav