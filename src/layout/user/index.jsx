import React from 'react'
import Header from './header'
import { Outlet, useLocation } from 'react-router'
import Footer from './footer'
import { TransitionGroup } from 'react-transition-group'
import { CSSTransition } from 'react-transition-group'

function UserLayout() {
  const location = useLocation()
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Outlet />
          </CSSTransition>
        </TransitionGroup>
      </main>

      <footer>
        <Footer />
      </footer>

    </>
  )
}

export default UserLayout;