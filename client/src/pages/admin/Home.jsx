import React from 'react';
import { IoCreateOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    return (
        <div className='w-full min-h-screen bg-slate-200 flex items-center justify-center'>
            <div className='w-1/2 bg-white border-2 rounded px-12 py-6 flex flex-col gap-4'>
                <div onClick={() => {
                    navigate('/admin/create_user')
                }} className='px-6 py-2 flex items-center justify-center shadow-lg gap-4'>
                    <span><IoCreateOutline size={30} /></span>
                    <h4 className='font-bold'>Create User</h4>
                </div>
                <div onClick={() => {
                    navigate('/admin/show_users')
                }} className='px-6 py-2 flex items-center justify-center shadow-lg gap-4'>
                    <span><FiUsers size={30} /></span>
                    <h4 className='font-bold'>Show All Users</h4>
                </div>
            </div>
        </div>
    )
}

export default Home