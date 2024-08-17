import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import Home from './pages/user/home'
import Contact from './pages/user/contact'
import UserLayout from './layout/user'
import AdminLayout from './layout/admin'
import Cart from './pages/user/cart'
import About from './pages/user/about'
import FavList from './pages/user/favlist'
import Dashboard from './pages/admin/dashboard'
import EditPanel from './pages/admin/editPanel'
import Orders from './components/admin/orders'
import './assets/css/reset.css'
import './assets/css/animation.css'
import './assets/css/responsive.css'
import Details from './components/user/productDetail'
import NotFound from './pages/notfound'
import Login from './pages/user/login'
import { useDispatch, useSelector } from 'react-redux'
import MyAccount from './pages/user/account'
import { setUserFromLocalStorage } from './redux/slices/userSlice'
import Search from './pages/user/search'
import ForgetPassword from './pages/user/forgotpass'
import ResetPassword from './pages/user/resetPassword'
import AccountOrders from './pages/user/account/orders'
import AccountAddress from './pages/user/account/address'
import AccountDetails from './pages/user/account/details'
import AccountDashBoard from './pages/user/account/dashboard'
import Register from './pages/user/register'
function App() {
  const user = useSelector((state) => state.users.user)
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      dispatch(setUserFromLocalStorage(JSON.parse(storedUser)));
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path='products/:id/:color' element={<Details />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="cart" element={user ? <Cart /> : <Navigate to="/login" />} />
        <Route path="favlist" element={user ? <FavList /> : <Navigate to="/login" />} />
        <Route path="register" element={<Register />} />
        <Route path="/login" element={user ? <Navigate to="/myaccount/dashboard" /> : <Login />} />
        <Route path='/resetpassword/:id/:token' element={<ResetPassword />} />
        <Route path="/myaccount" element={user ? <MyAccount /> : <Navigate to="/login" />}>
          <Route path='dashboard' index element={<AccountDashBoard />} />
          <Route path="orders" element={<AccountOrders />} />
          <Route path="address" element={<AccountAddress />} />
          <Route path="details" element={<AccountDetails />} />
        </Route>
        <Route path='forgetpassword' element={user ? <Navigate to="/login" /> : <ForgetPassword />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="edit" element={<EditPanel />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route path='*' element={<NotFound />} />

    </Routes>

  )
}

export default App