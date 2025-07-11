import React, { useState, useEffect } from 'react'
import EmptyProfile from './assets/empty_prof.png'
import { useNavigate } from 'react-router-dom';
import './user.css'
import Navbar from './navbar.jsx'
import Trophy from './assets/Trophy-Clipart.png'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { createClient } from "https://esm.sh/@supabase/supabase-js"


import { supabase } from './supabaseClient'; // Adjust the path if needed


function User() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [calorieData, setCalorieData] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!userId) {
        console.error("No user_id found in localStorage");
        return;
      }
  
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();
  
      if (error) {
        console.error("Error fetching user profile:", error);
      } else {
        console.log("Fetched user profile:", data);
        setProfiles(data);
      }
    };
  
  

    const fetchCalorieIntake = async () => {
      const { data, error } = await supabase.from('calorie_intake').select('*');
      if (error) {
        console.error('Error fetching calorie intake:', error);
      } else {
        console.log('Fetched calorie intake data:', data);
        if (data && data.length > 0) {
          const dayData = data[0]; // Take the first row
          console.log('Day Data:', dayData); // Log the day data for debugging
          
          // Ensure dayData is valid before proceeding
          if (dayData) {
            const formattedData = Object.keys(dayData)
              .filter(key => key.startsWith('day'))
              .map(day => ({
                name: day,
                calories: dayData[day],
              }));
            setCalorieData(formattedData);
          }
        } else {
          console.log('No data found in calorie_intake table');
        }
      }
    };

    fetchProfiles();
    fetchCalorieIntake();
  }, []);

  const currentUser = profiles;
  return (
    <>
      <Navbar />
      <div className='container flex gap-30 text-left'>
        <div className='inter-font profile flex-1 text-left'>
          <img src={EmptyProfile} class='h-auto max-w-80 rounded-full' alt="React logo" />
          {currentUser ? (
            <>
              <div className='space-y-4'>             
                <p className='poetsen-font text-4xl text-orange font-bold'>Hello, {currentUser.name}!</p>
                <p className='text-2xl text-lime font-bold underline' >User Information</p>
                <p className='text-2xl text-pine italic'>Height: {currentUser.height}</p>
              </div>
              <p className='text-2xl text-pine italic'>Weight: {currentUser.weight}</p>
              <p className='text-2xl text-pine italic'>Target Weight: {currentUser.target_weight}</p>
              <p className='text-2xl text-pine italic'>AVG Miles Walked/Week: {currentUser.average_miles}</p>
              <p className='text-2xl text-pine italic'>AVG Calories Cons./Day: {currentUser.average_calories}</p>
            </>
          ) : (
            <p className='text-xl'>Loading user data...</p>
          )}
        </div>
        <div className='inter-font graph-achievement' class='flex-1, flexbox'>
          <div className='graph w-full space-y-8'>
            <p className='text-3xl text-lime text-left font-bold underline'>Calorie Intake Graph: Last 7 Days</p>
            <ResponsiveContainer width="110%" height={350}>
              <BarChart data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar dataKey="calories" fill='orange' />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='achievements font-bold space-y-8'>
            <p class='text-3xl text-lime text-left underline'>Achievements</p>
            <div class='grid grid-cols-6 gap-15'>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Daily Walker I</p>
            </div>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Healthy Eater I</p>
            </div>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Daily Login I</p>
            </div>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Daily Login II</p>
            </div>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Bulking Up! I</p>
            </div>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Daily Walker II</p>
            </div>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Healthy Eater II</p>
            </div>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Daily Login III</p>
            </div>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Bulking Up! II</p>
            </div>
            <div className='flex flex-col items-center'>
              <img src={Trophy} className='h-auto max-w-15' alt="Trophy" />
              <p className='text-sm text-center font-bold'>Calorie Burner I</p>
            </div>                                   
          </div>

        </div>
      </div>
    </div>

    </>
  )
}

export default User
