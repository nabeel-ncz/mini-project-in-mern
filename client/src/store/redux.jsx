import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.baseURL = 'http://localhost:3000';

const userReducer = (prev = { isAuthenticated: false }, action) => {
    switch (action.type) {
        case 'set_user':
            return {
                ...prev,
                userId: action?.payload.userId,
                name: action?.payload?.name,
                isAuthenticated: true,
            }
        case 'logout_user':
            return {
                ...prev,
                userId: '',
                name: '',
                isAuthenticated: false,
            }
        default:
            return prev;
    }
}

const adminReducer = (prev = { isAuthenticated: false }, action) => {
    switch (action.type) {
        case 'set_admin':
            return {
                ...prev,
                id: action?.payload?.id,
                name: action?.payload?.name,
                isAuthenticated: true,
            }
        case 'logout_admin':
            return {
                ...prev,
                id: '',
                name: '',
                isAuthenticated: false,
            }
        case 'get_users':
            return {
                ...prev,
                users: action?.payload?.users
            }
        case 'delete_user':
            return {
                ...prev,
                users: action.payload.users,
            }
        default:
            return prev;
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
});



/*------------------------------------->
action creators -> (user) */

//type->object
export const userSetAction = ({ userId, name }) => ({
    type: 'set_user',
    payload: { userId, name },
})

//type->function
export const userLogoutAction = () => {
    return (dispatch) => {
        axios.get("/user/logout", { withCredentials: true }).then(() => {
            dispatch({
                type: 'logout_user'
            });
        })
    }
}
export const registerUserAction = ({ image, name, email, password }, navigate) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        axios.post("/user/register", formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
            .then((result) => {
                if (result.data.status === 'ok') {
                    const { name, userId } = result.data.data;
                    dispatch(userSetAction({ userId, name }));
                    toast.success("You are successfully registered!");
                    navigate('/', { replace: true });
                } else {
                    toast.error(result.data.message);
                }
            }).catch((err) => {
                toast.error(err.message);
            })
    }
}
export const updateUserAction = ({ image, name, email, password, userId }, navigate) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        axios.post(`/user/update/${userId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
            .then((result) => {
                if (result.data.status === 'ok') {
                    toast.success("You are successfully updated!");
                    navigate('/', { replace: true });
                } else {
                    toast.error(result.data.message);
                }
            }).catch((err) => {
                toast.error(err.message);
            })
    }
}
export const loginUserAction = (form, navigate) => {
    return (dispatch) => {
        axios.post('/user/login', form, { withCredentials: true })
            .then((result) => {
                if (result.data.status === 'ok') {
                    const { name, userId } = result.data.data;
                    dispatch(userSetAction({ userId, name }));
                    toast.success("You are successfully logged in!");
                    navigate('/', { replace: true });
                } else {
                    toast.error(result.data.message);
                }
            }).catch((err) => {
                toast.error(err.message);
            })

    }
}
/*------------------------------------->
action creators -> (admin) */

//type->object
export const adminSetAction = ({ name, id }) => ({
    type: 'set_admin',
    payload: { name, id }
})
//type->function
export const adminLoginAction = (form, navigate) => {
    return (dispatch) => {
        axios.post('/admin/auth', form, { withCredentials: true }).then((result) => {
            if (result.data.status === 'ok') {
                const { name, id } = result.data?.data;
                dispatch(adminSetAction({ name, id }));
                toast.success("You are successfully logged in!");
                navigate('/admin', { replace: true })
            } else {
                toast.error(result.data.message);
            }
        }).catch((error) => {
            toast.error(error.message);
        })
    }
}
export const adminLogoutAction = () => {
    return (dispatch) => {
        axios.get('/admin/logout', { withCredentials: true }).then((result) => {
            dispatch({
                type: 'logout_admin'
            })
        })
    }
}
export const adminFetchUsers = () => {
    return (dispatch) => {
        axios.get('/admin/users/all', { withCredentials: true }).then((result) => {
        dispatch({
                type:'get_users',
                payload: {users : result.data?.data?.users}
            })
        }).catch((err) => {
            toast.error("Something went wrong!");
        })
    }
}

export const adminCreateAction = ({image, name, email, password},setForm, setImageBlob) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        axios.post('http://localhost:3000/admin/create', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }).then((result) => {
            if(result.data.status === 'ok'){
                toast.success("User created successfully!");
                setForm(prev => ({
                    ...prev, name:'', email:'', password:'',
                }));
                setImageBlob("");
            } else {
                toast.error(result.data.message);
            }
        }).catch((err) => {
            toast.error(err.message);
        })
    }
}

export const userDeleteAction = (id, setOpen) => {
    return (dispatch) => {
        axios.delete(`/admin/users/delete/${id}`, { withCredentials: true }).then((result) => {
            setOpen(false);
            dispatch(adminFetchUsers());
        }).catch((err) => {
            toast.error("Something went wrong!");
        })
    }
}

export const adminUpdateAction = ({image,name,email,password}, id, navigate) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        axios.put(`http://localhost:3000/admin/users/edit/${id}`,formData,{
            headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true    
        }).then((result) => {
            if(result.data.status === 'ok') {
                toast.success("User updated successfully!");
                navigate(-1);
            } else {
                toast.error(result.data.message);
            }
        }).catch((error) => {
            toast.error(error.message);
        })
    }
}


export const store = createStore(rootReducer, {}, applyMiddleware(thunk));