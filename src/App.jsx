import React from 'react'
import { Route, Routes } from 'react-router'
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
function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path='products/:id' element = {<Details />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="favlist" element={<FavList />} />
        <Route path='login' element = {<Login />} />
        <Route path='*' element = {<NotFound />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="edit" element={<EditPanel />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>

  )
}

export default App