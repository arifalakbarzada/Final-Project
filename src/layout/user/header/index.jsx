import React, { useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { CiHeart, CiSearch, CiUser } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchModal from '../../../pages/user/searchModal'
import { setSearchTerm } from '../../../redux/slices/searchSlice'

function Header() {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  const userInDis = useSelector((state)=>state.users.user)
  const cart = useSelector(state => state.cart.items)
  const handleSearch = (term) => {
    if (term.length > 0) {
      dispatch(setSearchTerm(term));
      navigate(`/search/${term}`);
      setIsModalOpen(false);
    }

  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  return (
    <div className='header'>
      <div className="logo" onClick={() => navigate('/')}>
        <h1>TechShop</h1>
      </div>
      <ul className='center-urls'>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <ul className="right-urls">
        <li onClick={() => setIsModalOpen(true)}>
          <CiSearch />
          <SearchModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSearch={handleSearch}
          />
        </li>
        <li>
          <NavLink to={'/login'}>
            <CiUser />
          </NavLink>
        </li>
        <li>
          <NavLink to={'/favlist'}>
            <CiHeart />
          </NavLink>
        </li>
        <li>
          <NavLink to={'/cart'}>
            <BsCart />
            <span className='total-price'>
              {cart.length > 0 && user || userInDis ? `(${cart.length})` : null}
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Header