import React from 'react'
import AdminNavbar from './adminnav'
import { Outlet, useLocation } from 'react-router'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import AdminFooter from './adminfooter'

function AdminLayout() {
 const location = useLocation()
  return (
    <>
      <header>
        <AdminNavbar />
      </header>
      <main className='admin'>
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Outlet />
          </CSSTransition>
        </TransitionGroup>
      </main>
      <footer>
        <AdminFooter />
      </footer>
    </>
  )
}

export default AdminLayout