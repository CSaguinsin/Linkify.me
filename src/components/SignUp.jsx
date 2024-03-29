import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Logo from '../assets/logo.png'
import Dashboard from '../maincomponents/Dashboard';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // New state to indicate if authentication state has been checked

  const handleEmailSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password); // Pass 'auth' object
      // No need for explicit redirection here as the auth state observer will handle it
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update the user state
        setUser(user);
      } else {
        // User is signed out, set user state to null
        setUser(null);
      }
      setAuthChecked(true); // Set authChecked to true once authentication state is checked
    });

    return () => {
      // Unsubscribe from the observer when the component unmounts
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Redirect to LandingPage if user is authenticated
    if (authChecked && user !== null) { // Check if authentication state has been checked
      navigate('/dashboard'); // Redirect only when authentication state is checked
    }
  }, [user, navigate, authChecked]);

  // Show loading spinner or error message
  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-gray-50 font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
            <a href="javascript:void(0)">
              <img
                src={Logo}
                alt="logo"
                className="w-40 mb-10 flex items-center justify-center mx-auto"
              />
            </a>
            <h2 className="text-center text-3xl font-bold">
              Create Account
            </h2>
            <form onSubmit={handleEmailSignIn} className="mt-10 space-y-4">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required=""
                  className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  autoComplete="current-password"
                  required=""
                  className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="Password"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="jajvascript:void(0);"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className="!mt-10">
                <button
                  type="submit" // Changed to submit button
                  className="w-full py-2.5 px-4 text-sm rounded text-white bg-[#FF914D] hover:bg-[#FF914D] focus:outline-none"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;
