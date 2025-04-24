import React, { useState, useEffect } from 'react'
import EmptyProfile from './assets/empty_prof.png'
import { useNavigate } from 'react-router-dom';
import './user.css'
import Navbar from './navbar.jsx'
import Trophy from './assets/Trophy-Clipart.png'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { createClient } from "https://esm.sh/@supabase/supabase-js"


const supabaseUrl = 'https://vhzmoieunypoledibcqa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoem1vaWV1bnlwb2xlZGliY3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NjYwMTMsImV4cCI6MjA2MDI0MjAxM30.qLvewkSAwcmg5-7mH10RMz2wGCUlmkz19P00nYjtuzY';




function User() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  const [calorieData, setCalorieData] = useState(null);
  
  useEffect(() => {
    const fetchCalories = async () => {
      if (!profiles[0]) return;
  
      const { data, error } = await supabase
        .from('calorie_intake')
        .select('*')
        .eq('user_id', profiles[0].id)
        .single();
  
      if (error) console.error(error);
      else {
        const formatted = Object.keys(data)
          .filter(key => key.startsWith('day'))
          .map((key, index) => ({
            name: `Day ${index + 1}`,
            calories: data[key]
          }));
        setCalorieData(formatted);
      }
    };
  
    fetchCalories();
  }, [profiles]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) console.error(error);
      else setProfiles(data);
    };

    fetchProfiles();
  }, []);

  const currentUser = profiles[0];
  return (
    <>
      <Navbar />
      <div className='container flex float-left'>
        <div className='profile flex-1'>
          <img src={EmptyProfile} class='h-auto max-w-80 rounded-full' alt="React logo" />
          {currentUser ? (
            <>
              <p className='text-4xl'>Hello, {currentUser.name}!</p>
              <p className='text-4xl'>User Information</p>
              <p className='text-2xl'>Height: {currentUser.height}</p>
              <p className='text-2xl'>Weight: {currentUser.weight}</p>
              <p className='text-2xl'>Target Weight: {currentUser.target_weight}</p>
              <p className='text-2xl'>AVG Miles Walked/Week: {currentUser.average_miles}</p>
              <p className='text-2xl'>AVG Calories Consumed/Day: {currentUser.average_calories}</p>
            </>
          ) : (
            <p className='text-xl'>Loading user data...</p>
          )}
          <button onClick={() => navigate('/')}>Go to Home Page</button>
        </div>
        <div className='graph-achievement' class='flex-1, flexbox'>
        <div className='graph'>
          <h2 className='text-3xl'>Calorie Intake Graph</h2>
          {calorieData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calories" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading graph...</p>
          )}
        </div>
          <div className='achievements'>
            <h2 class='text-3xl'>Achievements</h2>
            <div class='grid grid-cols-6 gap-4'>
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
              <img src={Trophy} class='h-auto max-w-10' alt="React logo" />
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default User
