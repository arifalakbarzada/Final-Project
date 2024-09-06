import React, { useEffect, useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { CiHeart, CiSearch, CiUser } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchModal from '../../../pages/user/searchModal'
import { setSearchTerm } from '../../../redux/slices/searchSlice'
import { usersApi } from '../../../service/base'

function Header() {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  const userInDis = useSelector((state)=>state.users.user)
  const cart = useSelector(state => state.cart.items)
  const [country , setCountry] = useState('')
  useEffect(() => {
    usersApi.getUserCountry().then(res=>setCountry(res))
  }, [])
  
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
  // return (
  //   <div className='header'>
  //     <div className="logo" onClick={() => navigate('/')}>
  //       <h1>TechShop</h1>
  //     </div>
  //     <ul className='center-urls'>
  //       <li>
  //         <NavLink to="/">Home</NavLink>
  //       </li>
  //       <li>
  //         <NavLink to="/about">About</NavLink>
  //       </li>
  //       <li>
  //         <NavLink to="/contact">Contact</NavLink>
  //       </li>
  //     </ul>
  //     <ul className="right-urls">
  //       <li onClick={() => setIsModalOpen(true)}>
  //         <CiSearch />
  //         <SearchModal
  //           isOpen={isModalOpen}
  //           onClose={handleCloseModal}
  //           onSearch={handleSearch}
  //         />
  //       </li>
  //       <li>
  //         <NavLink to={'/login'}>
  //           <CiUser />
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to={'/favlist'}>
  //           <CiHeart />
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to={'/cart'}>
  //           <BsCart />
  //           <span className='total-price'>
  //             {cart.length > 0 && user || userInDis ? `(${cart.length})` : null}
  //           </span>
  //         </NavLink>
  //       </li>
  //     </ul>
  //   </div>
  // )
  return     <div className="header">
  <div className="navbar-logo">
    <img 
      src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
      alt="Amazon Logo" 
    />
  </div>
  <div className="navbar-location">
    <span>Deliver to</span>
    <strong>{country?.country}</strong>
  </div>
  <div className="navbar-search">
    <select className="navbar-search-category">
      <option>All</option>
      <option>Electronics</option>
      <option>Books</option>
      <option>Fashion</option>
    </select>
    <input type="text" className="navbar-search-input" />
    <button className="navbar-search-button">
      <CiSearch />
    </button>
  </div>
  <div className="navbar-account">
    <span>Hello, Sign in</span>
    <strong>Account & Lists</strong>
  </div>
  <div className="navbar-orders">
    <span>Returns</span>
    <strong>& Orders</strong>
  </div>
  <div className="navbar-cart">
    <i className="fas fa-shopping-cart"></i>
    <span>Cart</span>
  </div>
</div>
}

export default Header