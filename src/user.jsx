import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './user.css'
import Navbar from './navbar.jsx'

function User() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div>
      This is user page
      <button onClick={() => navigate('/')}>Go to Home Page</button>
      </div>
    </>
  )
}

export default User
