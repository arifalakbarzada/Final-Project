import React from 'react'
import Header from './header'
import { Outlet } from 'react-router'
import Footer from './footer'

function UserLayout() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default UserLayout