import React, { useEffect, useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { CiHeart, CiSearch, CiUser } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { productsApi, usersApi } from '../../../service/base'
import { filterByCategory, setFilter, setProducts } from '../../../redux/slices/productSlice'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  const userInDis = useSelector((state) => state.users.user)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const products = useSelector((state) => state.products.items)
  const cart = useSelector(state => state.cart.items)
  const [country, setCountry] = useState('')
  const [isMenuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    productsApi.getAllProduct().then(res=>setProducts(res))
  }, [dispatch])
  
  useEffect(() => {
    setFilteredProducts(products);
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [products]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category === '') {
      dispatch(setFilter(products))
    } else {
      dispatch(setFilter(products.filter(product => product.category === category)));
    }
  };
  useEffect(() => {
    usersApi.getUserCountry().then(res => setCountry(res))
  }, [])
  return (
    <div className='header'>
      <div className="logo" onClick={() => navigate('/')}>
        <h1>TechShop</h1>
      </div>

      <div className='search-bar'>
        <input type="text" placeholder="Search..." onChange={(e) => {
          setSearch(e.target.value)
        }} />
        <button><CiSearch /></button>
      </div>

      <div className='filter'>
        <select onChange={handleCategoryChange}>
          <option value="">All</option>
          {
            categories.map(category => (
              <option key={category} value={category}>{category}</option>
              ))
          }
        </select>
      </div>

      <ul className='center-urls'>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>

      <ul className="right-urls">
        <li><NavLink to='/login'><CiUser /></NavLink></li>
        <li><NavLink to='/favlist'><CiHeart /></NavLink></li>
        <li>
          <NavLink to='/cart'>
            <BsCart />
            <span className='total-price'>
              {cart.length > 0 && user || userInDis ? `(${cart.length})` : null}
            </span>
          </NavLink>
        </li>
      </ul>

      <div className='responsive-menu' onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

  )
}

export default Header