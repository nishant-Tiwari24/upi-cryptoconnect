import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/api';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const a = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { name: firstName+lastName, email, password });
      // Navigate to login after successful registration
      window.location.href = '/login';
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className=" space-y-8 bg-zinc-900 p-8 rounded-lg shadow-lg w-[700px] h-[600px]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-none h-[50px] relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-none h-[50px] relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none h-[50px] relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none h-[50px] relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-6 text-center bottom-3 text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-400 hover:text-green-500">
            Log In here
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Register;
