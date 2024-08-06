import React, { useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { CiHeart, CiSearch, CiUser } from 'react-icons/ci'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SearchModal from '../../../pages/user/searchModal'
import { setSearchTerm } from '../../../redux/slices/searchSlice'

function Header() {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (term) => {
    if (term.length>0) {
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
      <div className="logo">
        <h1>TechShop</h1>
      </div>
      <ul className='center-urls'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
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
          <Link to={'/login'}>
            <CiUser />
          </Link>
        </li>
        <li>
          <Link to={'/favlist'}>
            <CiHeart />
          </Link>
        </li>
        <li>
          <Link to={'/cart'}>
            <BsCart />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Header