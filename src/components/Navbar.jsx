import React from 'react'
import Logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1 px-10">
    <img src={Logo} alt="logo" className="h-10" />
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-10">
      <li className='pt-2'>
        <a className='font-bold'>Log In</a>
    </li>
      <li>
      <button className="btn btn-warning font-bold rounded-full text-white">Get Started</button>
      </li>
    </ul>
  </div>
</div>
  )
}

export default Navbar