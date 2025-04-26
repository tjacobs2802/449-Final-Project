import React, { useState, useEffect } from 'react';
import './leaderboard.css';
import Navbar from './navbar.jsx';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://vhzmoieunypoledibcqa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoem1vaWV1bnlwb2xlZGliY3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NjYwMTMsImV4cCI6MjA2MDI0MjAxM30.qLvewkSAwcmg5-7mH10RMz2wGCUlmkz19P00nYjtuzY';
const supabase = createClient(supabaseUrl, supabaseKey);

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const { data, error } = await supabase.from('leaderboard').select('*');
      
      if (error) {
        console.error('Error fetching leaderboard data:', error);
      } else {
        console.log('Fetched leaderboard data:', data);
        // Sort data by score in descending order
        const sortedData = data ? data.sort((a, b) => b.score - a.score) : [];
        setLeaderboardData(sortedData);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Generate dummy data if no data is fetched
  const displayData = leaderboardData.length > 0 ? leaderboardData : Array(10).fill({
    player_name: '-',
    score: '-',
    streak_count: '-',
    date: '-'
  });

  return (
    <>
      <Navbar />
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">LeaderBoard</h1>
        
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <div className="header-cell rank-header"></div>
            <div className="header-cell player-header">Player</div>
            <div className="header-cell score-header">Score</div>
            <div className="header-cell streak-header">Streak Count</div>
            <div className="header-cell date-header">Date</div>
          </div>
          
          {displayData.slice(0, 10).map((entry, index) => (
            <div className="leaderboard-row" key={index}>
              <div className="rank-cell">#{index + 1}</div>
              <div className="player-cell">{entry.player_name}</div>
              <div className="score-cell">{entry.score}</div>
              <div className="streak-cell">{entry.streak_count}</div>
              <div className="date-cell">{entry.date}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Leaderboard;