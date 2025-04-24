import React from 'react'
import { useState } from 'react'
import EmptyProfile from './assets/empty_prof.png'
import { useNavigate } from 'react-router-dom';
import './user.css'
import Navbar from './navbar.jsx'
import { createClient } from "https://esm.sh/@supabase/supabase-js"



function User() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className='container' class='flex float-left'>
        <div className='profile' class='flex-1'>
          <img src={EmptyProfile} class='h-auto max-w-80 rounded-full' alt="React logo" />
          <p class='text-4xl'>Hello, Trevor!</p>
          <p class='text-4xl'>User Information</p>
          <p class='text-2xl'>Height: 6’ 2”</p>
          <p class='text-2xl'>Weight: 230 lbs</p>
          <p class='text-2xl'>Target Weight: 200lbs</p>
          <p class='text-2xl'>AVG Miles Walked/Week: 2.5 mi</p>
          <p class='text-2xl'>AVG Calories Consumed/Day: 2500</p>
          <button onClick={() => navigate('/')}>Go to Home Page</button>
        </div>
        <div className='graph-achievement' class='flex-1, flexbox'>
          <div className='graph'>
            <h2 class='text-3xl'>Calorie Intake Graph</h2>
          </div>
          <div className='achievements'>
            <h2 class='text-3xl'>Achievements</h2>
          </div>
        </div>
      </div>

    </>
  )
}

export default User
