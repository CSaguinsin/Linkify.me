import React from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1 px-10">
    <Link to='/'>
    <img src={Logo} alt="logo" className="h-10" />
    </Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-10">
      <Link to='/login'>
      <li className='pt-2'>
        <a className='font-bold'>Log In</a>
    </li>
    </Link>
    <Link to='/signup'>
      <li>
      <button className="btn btn-warning font-bold rounded-full text-white">Get Started</button>
      </li>
      </Link>
    </ul>
  </div>
</div>
  )
}

export default Navbar