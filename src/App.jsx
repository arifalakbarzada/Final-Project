import React from 'react'
import { Route, Routes } from 'react-router'
import { productsApi } from './service/base'
import Home from './pages/user/home'
import Contact from './pages/user/contact'
import UserLayout from './layout/user'
import AdminLayout from './layout/admin'
import Cart from './pages/user/cart'
import About from './pages/user/about'
function App() {
  console.log(productsApi.getAllProduct())
  return (
    <Routes>
      <Route path='/' element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
<Route path='/admin' element ={<AdminLayout />}>

</Route>
    </Routes>
  )
}

export default App