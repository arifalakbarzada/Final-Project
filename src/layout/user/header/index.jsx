import React from 'react'
import { BsCart } from 'react-icons/bs'
import { CiSearch, CiUser } from 'react-icons/ci'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartTotalItems, selectCartTotalPrice } from '../../../redux/slices/cartSlice'

function Header() {
  const dispatch = useDispatch()
  return (
    <div className='header'>
      <div className="logo">
        <h1>TechShop</h1>
      </div>
      <ul className='center-urls'>
        <li>
          <Link to= "/">Home</Link>
        </li>
        <li>
          <Link to= "/about">About</Link>
        </li>
        <li>
          <Link to= "/contact">Contact</Link>
        </li>
      </ul>
<ul className="right-urls">
  <li>
  <CiSearch />
  </li>
  <li>
    <Link to={'/login'}><CiUser /></Link>
  
  </li>
  <li>
    <Link to={'/cart'}><BsCart /></Link>
  
{/* {dispatch(selectCartTotalItems)}
{dispatch(selectCartTotalPrice)} $ */}
  </li>
</ul>
    </div>
  )
}

export default Header