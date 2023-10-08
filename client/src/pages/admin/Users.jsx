import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/CustomModal/DeleteModal';
import { adminFetchUsers, userDeleteAction } from '../../store/redux';
import { useDispatch, useSelector } from 'react-redux';

function Users() {
    const dispatch = useDispatch();
    const users = useSelector(state => state?.admin?.users);

    const [open, setOpen] = useState(false);
    const [currId, setCurrId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(adminFetchUsers());
    }, []);

    const handleDelete = (id) => {
        dispatch(userDeleteAction(id, setOpen));
    }

    return (
        <>
            <div className='w-full min-h-screen px-14 pt-24 bg-slate-200 flex flex-col items-center justify-start gap-2 shadow-sm'>
                {console.log(users)}
                {!users && <h4>No users found !</h4>}
                {users?.map((doc) => {
                    return (
                        <div key={doc._id} className='user_card w-full flex items-center justify-between px-10 py-4 rounded bg-white'>
                            <div className='flex items-center justify-center gap-6'>
                                <img src={"http://localhost:3000/uploads/" + doc.profile} alt=""
                                    className='w-16 h-16 rounded-full' />
                                <div className='flex flex-col items-start justify-center'>
                                    <h4 className='font-bold'>{doc.name}</h4>
                                    <h4>{doc.email}</h4>
                                    <h4>Created at : {doc.createdAt}</h4>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-1'>
                                <button onClick={() => {
                                    navigate(`edit/${doc._id}`);
                                }} className='w-20 h-8 rounded bg-yellow-300 flex items-center justify-center'>Edit</button>
                                <button onClick={() => {
                                    setCurrId(doc._id)
                                    setOpen(true);
                                }} className='w-20 h-8 rounded bg-red-400 flex items-center justify-center'>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <DeleteModal userId={currId} open={open} setOpen={setOpen} handleDelete={handleDelete} />
        </>
    )
}

export default Users