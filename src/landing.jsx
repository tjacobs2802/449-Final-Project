import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './landing.css'
import Navbar from './navbar.jsx'

function Landing() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();


  return (
    <>
      <Navbar />
      <h1>Track your health!</h1>
      <h2>Track fitness, nutrition, and health goals by completing daily and weekly tasks for rewards!</h2>
      <div className = "login-container">
        <div className = "log-box">
        <h2>Login/Sign up</h2>
        <input type="text" placeholder="E-mail"/>
        <input type="text" placeholder="Username"/>
        <input type="password" placeholder = "Password"/>
        <button>Login</button>
        <button>Sign Up</button>
        </div>
      </div>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>

      <button onClick={() => navigate('/user')}>Go to User Page</button>
      <button onClick={() => navigate('/log_food')}>Go to Log Food Page</button>

    </>
  )
}

export default Landing
