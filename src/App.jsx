import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// components
import Home from '../src/components/Home'
import Navbar from './components/Navbar'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp';
import Footer from './components/Footer';


// Main Components
import Dashboard from './maincomponents/Dashboard';
import Profile from './maincomponents/Profile';
function App() {
  return (
    <>
        {/* <Navbar />  */}
        <Routes>
           <Route path="/" element={<Home />} />  
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Routes after Auth */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
        {/* <Footer /> */}
    </>
  )
}

export default App
