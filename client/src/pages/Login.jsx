import React, { useState } from 'react';
import { useFormData } from '../hooks/hooks';
import { useDispatch } from 'react-redux';
import { loginUserAction, userSetAction } from "../store/redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm, handleChange] = useFormData({ email: '', password: '' });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUserAction(form, navigate));
    }

    return (
        <div className='w-full min-h-screen flex bg-slate-200 items-center justify-center'>
            <div className='w-1/4 bg-white flex flex-col items-center justify-center p-8'>
                <h2 className='font-bold text-xl'>Login</h2>
                <form action="" className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col items-start gap-2">
                        <label htmlFor="">Email</label>
                        <input type="email" name='email' value={form.email} onChange={handleChange} className='w-full h-10 p-2 focus:outline-none border border-black' required />
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">
                        <label htmlFor="">Password</label>
                        <input type="password" name='password' value={form.password} onChange={handleChange} className='w-full h-10 p-2 focus:outline-none border border-black' required />
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">
                        <button type='submit' className='w-full text-center py-2 bg-black text-white'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login