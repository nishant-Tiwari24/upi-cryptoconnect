import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/api';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie"

const notify = () => toast('Login Successfully');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password });
      Cookies.set('token', response.data.token, {expires: 1});
      Cookies.set('userEmail', email, {expires: 1});
      localStorage.setItem('token', response.data.token);
      window.location.href = '/'
      notify();
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[700px] space-y-8 bg-zinc-900 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-zinc rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white">Remember me</label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-green-400 hover:text-green-500">Forgot your password?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out"
            >
              Sign in
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-gray-400">or</p>
        </form>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => signIn("google")}
            className="group relative flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out"
          >
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M19 10c0-1.55-.41-2.99-1.12-4.23H10v8.05h5.53c-.23 1.2-.86 2.26-1.78 3.09v2.55h2.88c1.68-1.55 2.64-3.82 2.64-6.46z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 20c2.4 0 4.37-.82 5.86-2.22l-2.88-2.55c-.8.53-1.81.84-2.98.84-2.28 0-4.21-1.54-4.88-3.63H1V15c1.68 3.32 5.38 5.74 9 5.74z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M5.12 12c-.11-.54-.17-1.11-.17-1.69s.06-1.15.17-1.69V7.39H1c-.57 1.05-.88 2.25-.88 3.61s.31 2.56.88 3.61l4.12-3.62z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 3.13c1.25 0 2.37.42 3.26 1.25l2.33-2.33C14.37.53 12.4 0 10 0 5.38 0 1.68 2.42 0 5.74l2.88 2.55C5.79 4.67 7.72 3.13 10 3.13z" clipRule="evenodd" />
              </svg>
            </span>
            Sign in with Google
          </button>

          <button
            className="group relative flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-300 ease-in-out"
          >
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 0C4.48 0 0 4.48 0 10c0 4.42 2.88 8.17 6.84 9.49.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.5.46-3.03-1.21-3.23-2.32-.11-.58-.59-2.32-1.02-2.79-.35-.39-.85-1.09-.01-1.11.79-.01 1.35.72 1.54 1.03.91 1.52 2.36 1.09 2.94.83.09-.66.35-1.09.64-1.34-2.24-.25-4.58-1.12-4.58-4.98 0-1.1.39-2 1.03-2.71-.1-.26-.45-1.28.1-2.66 0 0 .85-.27 2.77 1.03A9.53 9.53 0 0110 5.47c.85.01 1.71.11 2.5.34 1.92-1.3 2.77-1.03 2.77-1.03.55 1.38.2 2.4.1 2.66.64.71 1.03 1.61 1.03 2.71 0 3.87-2.35 4.73-4.59 4.98.36.31.68.93.68 1.87 0 1.35-.01 2.43-.01 2.76 0 .27.18.59.69.49C17.12 
                18 18 20 14.41 20 10c0-5.52-4.48-10-10-10z" clipRule="evenodd" />
              </svg>
</span>
Sign in with GitHub
</button>
</div>

<div className="mt-6 text-center text-sm text-gray-400">
Don't have an account yet?
<Link to="/register" className="ml-1 font-medium text-green-400 hover:text-green-500">Register here</Link>
</div>
</div>
<Toaster/>
</div>
);
};

export default Login;
