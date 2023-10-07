import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
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
                userId:'',
                name: '',
                isAuthenticated: false,
            }
        default:
            return prev;
    }
}

const adminReducer = (prev = { isAuthenticated: false }, action) => {
    switch(action.type) {
        case 'set_admin':
            return {
                ...prev,
                id: action?.payload?.id,
                name: action?.payload?.name,
                isAuthenticated: true,
            }
        case 'logout_admin':
            return{
                ...prev,
                id:'',
                name:'',
                isAuthenticated: false,
            }
        default:
            return prev;
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
});


//Action creators
export const userSetAction = ({ userId, name }) => ({
    type: 'set_user',
    payload: { userId, name },
})
export const userLogoutAction = () => {
    return (dispatch) => {
        axios.get("/user/logout", { withCredentials: true }).then(() => {
            dispatch({
                type: 'logout_user'
            });
        })
    }
}

//Action creators (type:function)
//Action for register user -> returns a promise (axios:post)
export const registerUserAction = ({image, name, email, password}) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        return axios.post("/user/register", formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials:true })
    }
}
//Action for login user -> returns a promise (axios:post)
export const loginUserAction = (form) => {
    return (dispatch) => {
        return axios.post('/user/login',form, { withCredentials:true });
    }
}


//action creators -> (admin)
export const adminSetAction = ({name, id}) => ({
    type:'set_admin',
    payload: {name, id}
})

export const adminLogoutAction = () => {
    return (dispatch) => {
        axios.get('/admin/logout',{ withCredentials: true }).then((result) => {
            dispatch({
                type:'logout_admin'
            })
        })
    }
}

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));