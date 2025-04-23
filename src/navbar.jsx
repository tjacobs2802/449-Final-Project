import React from 'react'

function Navbar() {
    return (
      <nav className="bg-pine fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-orange self-center text-2x1 font-semibold whitespace-nowrap dark:text-white">
              Health and Wellness Tracker
            </span>
          </a>
        </div>
      </nav>
    );
  }
  
  export default Navbar;