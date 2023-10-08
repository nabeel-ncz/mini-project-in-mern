import './App.css'
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import AdminDashboard from './pages/admin/Home';
import AdminLogin from './pages/admin/Login';
import Create from './pages/admin/Create';
import Users from './pages/admin/Users';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { userSetAction, adminSetAction } from './store/redux';
import axios from 'axios';
import AdminNav from './components/AdminNav/AdminNav';
import Edit from './pages/admin/Edit';
import EditUser from './pages/Edit';
import { Toaster } from "react-hot-toast";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.user);
  const admin = useSelector(state => state.admin);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!user.isAuthenticated) {
      axios.get('http://localhost:3000/user/get_auth', {
        withCredentials: true
      }).then((result) => {
        console.log(result);
        if (result.data.status === 'ok') {
          dispatch(userSetAction({
            name: result.data.data.name,
            userId: result.data.data.id,
            isAuthenticated: true,
          }));
        }
      })
    }
    if (!admin.isAuthenticated) {
      axios.get('http://localhost:3000/admin/get_auth', { withCredentials: true })
        .then((result) => {
          if (result.data.status === 'ok') {
            dispatch(adminSetAction({
              name: result.data.data.name,
              id: result.data.data.id,
              isAuthenticated: true,
            }))
          }
        })
    }
    console.log("user : ", user);
    console.log("admin : ", admin);
  }, [user, admin]);

  return (
    <>
      <Toaster position='top-center' />
      {location.pathname.split('/').at(1) === "admin" ? <AdminNav /> : <Navbar />}
      <Routes>
        {user.isAuthenticated ?
          (<>
            <Route path='/' element={<Home />} />
            <Route path='/edit' element={<EditUser />} />
            <Route path='*' element={admin.isAuthenticated &&
              <Navigate to={`${location.pathname.split('/').at(1) === "admin" ?
                "/admin" : "/"}`} replace />} />
          </>) :
          (<>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={
              <Navigate to={`${location.pathname === '/' ? "/register" : location.pathname}`} replace />}
             />
          </>)
        }
        {admin.isAuthenticated ?
          (<>
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/create_user' element={<Create />} />
            <Route path='/admin/show_users' element={<Users />} />
            <Route path='/admin/show_users/edit/:id' element={<Edit />} />
            <Route path="/admin/*" element={<Navigate to="/admin" replace />}/>
          </>) :
          (<>
            <Route path='/admin/auth' element={<AdminLogin />} />
            <Route path="/admin/*" element={<Navigate to="/admin/auth" replace />}/>
          </>)
        }
      </Routes>
    </>
  )
}

export default App
