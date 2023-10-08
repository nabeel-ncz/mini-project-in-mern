import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import { useNavigate } from 'react-router-dom';

function Home() {
  const id = useSelector(state => state.user?.userId);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/user/get/${id ? id : ""}`, { withCredentials: true }).then((result) => {
      if(result.data.status === 'ok'){
        setUser(result.data.data.user);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, [id]);
  
  return (
    <div className='w-full min-h-screen flex bg-slate-200 items-center justify-center'>
        <div className='w-1/2 h-3/4 py-8 rounded shadow bg-white flex flex-col items-center justify-center'>
            <img className='w-40 h-40 rounded-full' src={`${user ? "http://localhost:3000/uploads/"+user?.profile : ""}`} alt="" />
            <h4 className='font-semibold'>Name : {user?.name}</h4>
            <h4>Email : {user?.email}</h4>
            <h4>Account created at : {user?.createdAt}</h4>
            <div className='mt-4 flex items-center justify-center gap-2'>
              <button onClick={() => {
                  navigate(`/edit?name=${user?.name}&email=${user?.email}`);
              }} className='px-6 py-2 rounded bg-yellow-300 flex items-center justify-center'> Edit Info </button>
              <LogoutButton role="user" bg_color="bg-red-300" text_color="text-black" />
            </div>
        </div>
    </div>
  )
}

export default Home