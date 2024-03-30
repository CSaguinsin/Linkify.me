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
        </Routes>
        {/* <Footer /> */}
    </>
  )
}

export default App
