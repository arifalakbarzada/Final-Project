import React from 'react'
import Header from './header'
import { Outlet } from 'react-router'
import Footer from './footer'

function UserLayout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>

    </>
  )
}

export default UserLayout;