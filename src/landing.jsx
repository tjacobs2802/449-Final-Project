import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './landing.css'
import Navbar from './navbar.jsx'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { supabase } from './supabaseClient';

function Landing() {
    const navigate = useNavigate();

    // const [count, setCount] = useState(0)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            // Handle Login
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) {
                    setErrorMessage(error.message);
                } else {
                    const userId = data.user.id;
                    localStorage.setItem('user_id', userId);

                    setEmail('');
                    setUsername('');
                    setPassword('');
                    
                    alert('Login Successful');
                    navigate('/user');
                }
            } catch (err) {
                setErrorMessage(err.message || 'An error occurred during login');
            }
        } else {
            // Handle Sign Up
            try {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : '',
                        data: { display_name: username}
                    },
                });
                
                if (error) {
                    setErrorMessage(error);
                } else {
                    const userId = data.user.id;
                    localStorage.setItem('user_id', userId);
                    
                    setEmail('');
                    setUsername('');
                    setPassword('');

                    alert('Sign up Successful');
                    navigate('/user');
                }
            } catch (err) {
                setErrorMessage(err.message || 'An error occurred during sign up');
            }
        }

    };

    return (
        <>
            <Navbar />
            <h1 className='text-orange poetsen-font'>Track your health!</h1>
            <h2 className='text-pine font-bold'>Track fitness, nutrition, and health goals by completing daily and weekly tasks for rewards!</h2>
            <form className = "login-container" onSubmit={handleSubmit}>
                <div className = "log-box text-lime">
                    <h2>Login/Sign up</h2>

                    <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                
                    <button type="submit" className='text-pine' onClick={() => setIsLogin(true)}>Login</button>
                    <button type="submit" className='text-pine' onClick={() => setIsLogin(false)}>Sign Up</button>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
            </form>
        </>
  );
};

export default Landing
