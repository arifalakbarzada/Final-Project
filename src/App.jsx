import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import Home from './pages/user/home'
import Contact from './pages/user/contact'
import UserLayout from './layout/user'
import AdminLayout from './layout/admin'
import Cart from './pages/user/cart'
import About from './pages/user/about'
import FavList from './pages/user/favlist'
import Dashboard from './pages/admin/dashboard'
import EditPanel from './pages/admin/editPanel'
import Orders from './pages/admin/orders'
import './assets/css/reset.css'
import './assets/css/animation.css'
import './assets/css/responsive.css'
import Details from './components/productDetail'
import NotFound from './pages/notfound'
import Login from './pages/user/login'
import { useDispatch, useSelector } from 'react-redux'
import MyAccount from './pages/user/account'
import Search from './pages/user/search'
import ForgetPassword from './pages/user/forgotpass'
import ResetPassword from './pages/user/resetPassword'
import AccountOrders from './pages/user/account/orders'
import AccountAddress from './pages/user/account/address'
import AccountDetails from './pages/user/account/details'
import AccountDashBoard from './pages/user/account/dashboard'
import Register from './pages/user/register'
import Submit from './pages/user/submit'
import Checkout from './pages/user/checkout'
import { cartApi, favListApi, productsApi, usersApi } from './service/base'
import { logoutUser, setUser, setUserFromLocalStorage } from './redux/slices/userSlice'
import AddPanel from './pages/admin/addPanel'
import UserManagement from './pages/admin/users'
import AddNewProduct from './pages/admin/addNewProduct'
import { setProducts } from './redux/slices/productSlice'
import { setCartItems } from './redux/slices/cartSlice'
import { setFavList } from './redux/slices/favListSlice'

function App() {
  const cart = useSelector((state) => state.cart.items)
  const dispatch = useDispatch();
  const [userState, setUserState] = useState()
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  const [role, setRole] = useState(null)
  const userRedux = useSelector((state) => state.users.user)
  useEffect(() => {
    if (userState?.status === 'Banned') {
      dispatch(logoutUser())
      useNavigate('/login')
    }
  }, [dispatch])

  useEffect(() => {
    productsApi.getAllProduct().then(res => dispatch(setProducts(res)))
  }, [dispatch])

  useEffect(() => {
    if (user) {
      usersApi.getSingleUser(JSON.parse(user).id).then(res => setRole(res.role))
      usersApi.getSingleUser(JSON.parse(user).id).then(res => dispatch(setUser(res)))
      favListApi.getFavList(JSON.parse(user).id).then(res=>setFavList(res.favlist))
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      cartApi.getCart(JSON.parse(user).id).then(res => dispatch(setCartItems(res.userCart)))
    }
  }, [dispatch])

  useEffect(() => {
    if (user) {
      usersApi.getSingleUser(JSON.parse(user).id).then(res => setUserState(res))
      const time = new Date()
      usersApi.changeUserActivity(JSON.parse(user).id, userState, time)
    }

  }, [dispatch])

  const savedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  useEffect(() => {
    if (savedUser) {
      dispatch(setUserFromLocalStorage(savedUser));
    }
  }, [dispatch]);

  return (

    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path='products/:id/:colorId/:color' element={<Details />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="cart" element={user || userRedux ? <Cart /> : <Navigate to="/login" />} />
        <Route path="favlist" element={user || userRedux ? <FavList /> : <Navigate to="/login" />} />
        <Route path="register" element={<Register />} />
        {user && cart.length > 0 ? (<Route path='/submit' element={<Submit />} />) : null}
        {user && cart.length > 0 ? (<Route path='/checkout' element={<Checkout />} />) : null}
        <Route path="/login" element={user || userRedux ? <Navigate to="/myaccount/dashboard" /> : <Login />} />
        <Route path='/resetpassword/:id/:token' element={<ResetPassword />} />
        <Route path="/myaccount" element={user || userRedux ? <MyAccount /> : <Navigate to="/login" />}>
          <Route path='dashboard' index element={<AccountDashBoard />} />
          <Route path="orders" element={<AccountOrders />} />
          <Route path="address" element={<AccountAddress />} />
          <Route path="settings" element={<AccountDetails />} />
        </Route>
        <Route path='forgetpassword' element={user ? <Navigate to="/login" /> : <ForgetPassword />} />
      </Route>
      {
        role === 'admin' ?
          <Route path="/admin" element={<AdminLayout />}>
            <Route index path='dashboard' element={<Dashboard />} />
            <Route path="edit" element={<EditPanel />} />
            <Route path='addnew' element={<AddNewProduct />} />
            <Route path="edit/:id" element={<AddPanel />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
          : null
      }

      <Route path='*' element={<NotFound />} />

    </Routes>


  )
}

export default App