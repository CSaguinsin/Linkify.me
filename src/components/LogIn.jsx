import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png'
import {  signInWithEmailAndPassword, signInWithPopup   } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import Navbar from './Navbar';
import Footer from './Footer';
const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/dashboard")
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
}
  return (
    <>  
<Navbar />
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
        Log in to your account
      </h2>
      <form className="mt-10 space-y-4">
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
          onClick={onLogin}
            type="button"
            className="w-full py-2.5 px-4 text-sm rounded text-white bg-[#FF914D] hover:bg-[#FF914D] focus:outline-none"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
<Footer />
    </>
  )
}

export default LogIn