import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutButton from '../LogoutButton/LogoutButton'
import RegisterButton from '../RegisterButton/RegisterButton'
function Navbar() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

    return (
        <div className='w-full fixed top-0 bg-white flex items-center justify-center px-20 py-4'>
            <div className='w-full flex justify-between items-center'>
                <h4 className='font-bold text-lg'>
                    User.
                </h4>
                <ul className='flex items-center justify-center list-none gap-8'>
                    <Link to={'/'}><li>Home</li></Link>
                    <li>About</li>
                    <li>Contact</li>
                    {isAuthenticated 
                    ? <LogoutButton role="user" text_color="text-white" bg_color="bg-black" />
                    : <RegisterButton role="user" />
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar