import React, { useState } from 'react';
import { useFormData } from '../hooks/hooks';
import { useDispatch } from 'react-redux';
import { loginUserAction, userSetAction } from "../store/redux";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm, handleChange] = useFormData({ email: '', password: '' });
    const [formStatus, setFormStatus] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormStatus({loading:true, error:false, message:''});
        dispatch(loginUserAction(form)).then((result) => {
            if (result.data.status === 'ok') {
                const { name, userId } = result.data.data;
                dispatch(userSetAction({ userId, name }));
                setFormStatus({loading:false, error:false, message:''});
                navigate('/', { replace: true });
            } else {
                setFormStatus({loading:false, error:true, message:result.data.message});
            }
        }).catch((err) => {
            setFormStatus({loading:false, error:true, message:err.message});
        })
    }

    return (
        <div className='w-full min-h-screen flex bg-slate-200 items-center justify-center'>
            <div className='w-1/4 bg-white flex flex-col items-center justify-center p-8'>
                <h2 className='font-bold text-xl'>Login</h2>
                {formStatus && formStatus.loading && (
                    <h4>Loading...</h4>
                )}
                {formStatus?.error && (
                    <h4>{formStatus.message}</h4>
                )}
                <form action="" className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col items-start gap-2">
                        <label htmlFor="">Email</label>
                        <input type="text" name='email' value={form.email} onChange={handleChange} className='w-full h-10 p-2 focus:outline-none border border-black' required />
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">
                        <label htmlFor="">Password</label>
                        <input type="text" name='password' value={form.password} onChange={handleChange} className='w-full h-10 p-2 focus:outline-none border border-black' required />
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