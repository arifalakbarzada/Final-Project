import React from 'react'
import { Route, Routes } from 'react-router'
import { productsApi } from './service/base'
import Home from './pages/user/home'
import Contact from './pages/user/contact'
function App() {
  console.log(productsApi.getAllProduct())
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/cart' element = {<Cart />} />
    </Routes>
  )
}

export default App