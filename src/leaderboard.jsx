import React, { useState, useEffect } from 'react';
// Import the supabase client from your separate file
import { supabase } from './supabaseClient'; // Adjust the path if needed
import { Link } from 'react-router-dom';
import Navbar from './navbar.jsx';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, Score, Streak, Date');

      if (error) {
        console.error('Error fetching leaderboard data:', error);
      } else {
        console.log('Fetched leaderboard data:', data);
        // Sort data by Score descending
        const sortedData = data ? data.sort((a, b) => b.Score - a.Score) : [];
        setLeaderboardData(sortedData);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Dummy data if nothing is fetched
  const displayData = leaderboardData.length > 0 ? leaderboardData : Array(10).fill({
    name: '-',
    Score: '-',
    Streak: '-',
    Date: '-'
  });

  return (
    <div className="font-['Inter']">
      <Navbar />

      <div className="w-full px-2 py-10">
        <h1 className="text-[#FF8847] text-5xl md:text-5xl font-bold text-center mb-12 font-['Poetsen_One']">
          LeaderBoard
        </h1>

        <div className="w-full px-4 py-10 mx-auto">
          {/* SCROLL CONTAINER */}
          <div className="w-full overflow-x-auto">
            
            {/* Header Row */}
            <div className="flex bg-[#86FF70] text-black rounded-t-xl min-w-[1000px]">
              <div className="w-16 md:w-24 py-6 text-center font-bold text-lg"></div>
              <div className="flex-1 py-6 text-center font-bold text-lg md:text-xl">Player</div>
              <div className="flex-1 py-6 text-center font-bold text-lg md:text-xl">Score</div>
              <div className="flex-1 py-6 text-center font-bold text-lg md:text-xl">Streak Count</div>
              <div className="flex-1 py-6 text-center font-bold text-lg md:text-xl">Date</div>
            </div>

            {/* Data Rows */}
            {displayData.slice(0, 10).map((entry, index) => (
              <div 
                key={index} 
                className="flex bg-[#09725F] text-white border border-gray-700 rounded-xl mb-4 items-center h-20 min-w-[1000px]"
              >
                <div className="w-16 md:w-24 text-center font-['Poetsen_One'] text-[#FF8847] text-2xl font-bold">
                  #{index + 1}
                </div>
                <div className="flex-1 text-center text-lg md:text-xl">{entry.name}</div>
                <div className="flex-1 text-center text-lg md:text-xl">{entry.Score}</div>
                <div className="flex-1 text-center text-lg md:text-xl">{entry.Streak}</div>
                <div className="flex-1 text-center text-lg md:text-xl">{entry.Date}</div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
