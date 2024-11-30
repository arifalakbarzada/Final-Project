import React from 'react'
import Header from './header'
import { Outlet, useLocation } from 'react-router'
import Footer from './footer'
import { TransitionGroup } from 'react-transition-group'
import { CSSTransition } from 'react-transition-group'
import { NavLink } from 'react-router-dom'
import { CiHeart, CiUser } from 'react-icons/ci'
import { BsCart } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { changeResponsivity } from '../../redux/slices/userSlice'

function UserLayout() {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
  const resp = useSelector((state) => state.users.responsivity)
  const dispatch = useDispatch()

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
      <aside className={resp ? 'header-responsive active' : 'header-responsive'}>
        <div className="resp-header">
  
          <ul className='center-urls'>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>

          <ul className="right-urls">
            <li><NavLink to='/login'><CiUser /> {user ? 'My Account' : 'Login'}</NavLink></li>
            <li><NavLink to='/favlist'><CiHeart /> Favorites</NavLink></li>
            <li>
              <NavLink to='/cart'>
                <BsCart /> Cart
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default UserLayout;