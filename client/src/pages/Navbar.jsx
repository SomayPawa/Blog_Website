import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
  return (
    <>
    <nav>
      <Link to = "/">Home</Link>
      <Link to = "/Login">Login</Link>
      <Link to = "/Register">Register</Link>
      <Link to = "/Create">Create-Blog</Link>
      <Link to = "/Display">Display-Blog</Link>
    </nav>
    </>
  )
}

export default Navbar
