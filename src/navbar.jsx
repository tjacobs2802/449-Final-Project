import React from 'react'

function Navbar() {
    return (
      <nav className="bg-pine fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap justify-between mx-auto p-4">
        <span className="text-orange self-center text-2x1 dark:text-white" style={{ fontFamily: "'Poetsen One', sans-serif" }}>
              Health and Wellness Tracker
        </span>
          <div className="flex space-x-4 ml-auto">
            <a href="/" className = "text-white dark:text-white hover:underline">Home</a>
            <a href="/user" className = "text-white dark:text-white hover:underline">Profile</a>
            <a href="/log_food" className = "text-white dark:text-white hover:underline">Food Log</a>
            <a href="/leaderboard" className = "text-white dark:text-white hover:underline">Leaderboard</a>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;