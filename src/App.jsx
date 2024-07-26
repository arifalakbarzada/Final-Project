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
function App() {
  return (
    <Routes>
      <Route path='/' element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/favlist' element={<FavList />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='/editpanel' element={<EditPanel />} />
      </Route>
    </Routes>
  )
}

export default App