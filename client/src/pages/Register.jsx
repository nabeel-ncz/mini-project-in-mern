import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormData } from '../hooks/hooks';
import { registerUserAction, userSetAction } from '../store/redux';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

function Register() {
    const navigate = useNavigate();
    //dispatch
    const dispatch = useDispatch();
    //states
    const [form, setForm, handleChange] = useFormData({ name: '', email: '', password: '' });
    const [image, setImage] = useState(null);
    const [imageBlob, setImageBlob] = useState("");
    const [formStatus, setFormStatus] = useState(null);
    //for image showing when image is adding
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        const selected = event.target.files[0];
        if (selected) {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const blobUrl = event.target.result;
                setImageBlob(blobUrl);
            }
            fileReader.readAsDataURL(selected);
        }
    }
    //form submition
    const handleSubmit = (event) => {
        event.preventDefault();
        setFormStatus({loading:true,error:false, message:''});
        dispatch(registerUserAction({
            image: image,
            name: form.name,
            email: form.email,
            password: form.password,
        })).then((result) => {
            if (result.data.status === 'ok') {
                const { name, userId } = result.data.data;
                dispatch(userSetAction({ userId, name }));
                setFormStatus({loading:false,error:false, message:'success'});
                navigate('/', { replace: true });
            } else {
                setFormStatus({loading:false, error: true, message:result.data.message});
            }
        }).catch((err) => {
            setFormStatus({loading:false, error: true, message:err.message});
        })
    }

    return (
        <div className='w-full min-h-screen flex bg-slate-200 items-center justify-center'>
            <div className='w-1/4 bg-white flex flex-col items-center justify-center p-8'>
                <h2 className='font-bold text-xl'>Create Account</h2>
                {formStatus && formStatus.loading && (
                    <h4>Loading...</h4>
                )}
                {formStatus?.error && (
                    <h4>{formStatus.message}</h4>
                )}
                <form action="" className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col items-start gap-2">
                        <label htmlFor="">Name</label>
                        <input type="text" name='name' value={form.name} onChange={handleChange} className='w-full h-10 p-2 focus:outline-none border border-black' required />
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">
                        <label htmlFor="">Email</label>
                        <input type="text" name='email' value={form.email} onChange={handleChange} className='w-full h-10 p-2 focus:outline-none border border-black' required />
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">
                        <label htmlFor="">Password</label>
                        <input type="text" name='password' value={form.password} onChange={handleChange} className='w-full h-10 p-2 focus:outline-none border border-black' required />
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">
                        <label htmlFor="">Upload your profile</label>
                        <div className='w-full h-20 flex items-center justify-center border-2'>
                            <div className='w-1/2 border-e-2 h-full overflow-hidden flex items-center'>
                                <input type="file" onChange={handleImageChange} className='focus:outline-none' required />
                            </div>
                            <div className='w-1/2 h-full p-6'>
                                <img src={`${imageBlob}`} alt="..." className='h-full' />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">
                        <span>Already have an account <Link to={'/login'}>Login ?</Link></span>
                    </div>

                    <div className="w-full flex flex-col items-start gap-2">
                        <button type='submit' className='w-full text-center py-2 bg-black text-white'>Create</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Register;