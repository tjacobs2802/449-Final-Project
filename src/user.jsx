import React from 'react'
import { useState } from 'react'
import EmptyProfile from './assets/empty_prof.png'
import { useNavigate } from 'react-router-dom';
import './user.css'
import Navbar from './navbar.jsx'

function User() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div>
      <img src={EmptyProfile} class='h-auto max-w-80 rounded-full' alt="React logo" />
      <p class='text-xl'>Hello, Trevor!</p>
      <p class='text-xl'>User Information</p>
      <p class='text-l'>Height: 6’ 2”</p>
      <p class='text-l'>Weight: 230 lbs</p>
      <p class='text-l'>Target Weight: 200lbs</p>
      <p class='text-l'>AVG Miles Walked/Week: 2.5 mi</p>
      <p class='text-l'>AVG Calories Consumed/Day: 2500</p>
      <button onClick={() => navigate('/')}>Go to Home Page</button>
      </div>
    </>
  )
}

export default User
