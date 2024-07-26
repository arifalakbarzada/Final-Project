import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <div className="logo">
        <h1>MyLogo</h1>
      </div>
      <ul>
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
    </div>
  )
}

export default Header