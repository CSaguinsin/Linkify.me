import React, { useState } from 'react';
import { auth } from '../config/firebase'; // Import auth
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';  
import { firestore } from '../config/firebase'; // Import firestore



const Feedback = () => {
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [loggingOut, setLoggingOut] = useState(false);
    const navigate = useNavigate();

    // Function to handle sending feedback
    const sendFeedback = async () => {
        try {
            const feedbackRef = firestore.collection('feedbacks');
            await feedbackRef.add({
                name: name,
                feedback: feedback
            });
            // Reset form fields after successful submission
            setName('');
            setFeedback('');
            // Optionally, you can show a success message to the user
        } catch (error) {
            console.error('Error sending feedback:', error);
            // Handle error as needed, e.g., show an error message to the user
        }
    };

    // Handle logout
    const handleLogout = () => {
        setLoggingOut(true);
        signOut(auth)
            .then(() => {
                setTimeout(() => {
                    setLoggingOut(false);
                    navigate("/");
                }, 2000);
            })
            .catch((error) => {
                setLoggingOut(false);
                console.error('Logout error:', error);
                // Handle error as needed, e.g., show an error message to the user
            });
    };



  return (
<>
<section class='py-2 bg-[#E7A500] text-white text-center'>
        <p class='text-sm font-medium'>Thanks for using Linkify! This is just the MVP version. Please send feedback to improve your experience.</p>    
    </section>
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a onClick={handleLogout}>Log Out</a>
        </li>
        <Link to='/feedback'>
        <li>
          <a>Write some feedback</a>
        </li>
        </Link>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <img src={Logo} alt="Logo" className="w-30 h-10" />
  </div>
  </div>

  <section className='pb-30'>
            <h1 className='text-center  font-bold text-[80px]'>
                    Thank you so much for using <br />  <span className="text-[#FF914D]">Linkify.me</span>
            </h1>
            
            <p className='text-center pt-5 pb-5  font-regular'>Your feedback is crucial—it guides and shapes what I do. Your thoughts and opinions are invaluable in refining <br /> and improving my work to better meet your needs. So please, share your feedback with me—it's the compass that guides <br /> us towards excellence.</p>
            <div className="flex justify-center pt-5 space-x-3"> 
            </div>
  <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-4 bg-white max-w-md mx-auto w-full block text-sm border border-gray-300 outline-[#007bff] rounded"
            />
            <br />
            <textarea
                placeholder="User Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="p-4 bg-white max-w-md mx-auto w-full block text-sm border border-gray-300 outline-[#007bff] rounded"
                rows={4}
            />
            <div className='flex justify-center items-center pt-3 pb-10'>
                <button className="btn btn-warning font-bold rounded-lg text-white" onClick={sendFeedback}>Send feedback</button>
            </div>
    </div>
  </section>
  <Footer />
</> 
  )
}

export default Feedback