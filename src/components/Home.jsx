import React from 'react'
import Sample from '../assets/carlsaginsin.png';
import { Link } from 'react-router-dom';
import Screenshot from '../assets/Screenshot .png';
import Navbar from './Navbar';
import Footer from './Footer';


import User1 from '../assets/user1.png'
import User2 from '../assets/user2.png'
import User3 from '../assets/user3.png'
import User4 from '../assets/user4.png'
import User5 from '../assets/user5.png'
const Home = () => {
  return (
        <>
    <section class='py-2 bg-[#E7A500] text-white text-center px-10'>
        <p class='text-sm font-medium'>Thanks for using Linkify! This is just the MVP version. Please send feedback to improve your experience.</p>    
    </section>
        <Navbar />
            <div className="flex justify-center space-x-3 pt-10">   
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src={User1} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src={User2} alt="" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src={User3} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src={User4} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src={User5} />
                  </div>
                </div>
              </div>
              <p className="flex items-center font-['Inter Bold'] font-semibold">150+ People are using Linkify</p>
            </div>
            <h1 className='text-center  font-bold text-[80px]'>
            Where Every <span className="text-[#FF914D]">Link</span> Leads <br /> to <span className="text-[#FF914D]">Possibility</span>
            </h1>
            <div className="flex justify-center pt-5 space-x-3">
            <label className="input input-bordered flex  items-center gap-2">Linkify.me/<input type="text" className="grow" placeholder="yourname" /></label>
            <Link to="/login" >
                <button className="btn btn-warning font-bold rounded-lg text-white">Claim your Linkify</button>
            </Link>
            </div>

            <div className='flex pt-5 items-center justify-center pb-10 '>
              <img src={Sample} alt="sample" className="w-[70rem] rounded-lg shadow-lg" />

           </div>

<section className='bg-[#FF914D] pt-[10px]'>
              <h1 className='text-white pt-10 flex items-center justify-center font-bold text-[5rem]'>Linkify.me👋</h1>
              <p className='text-white flex items-center justify-center font-semibold text-[1rem] pb-10'>Share it with everybody, everywhere🔗</p>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-primary">Yow! Check out my Linkify! It's awesome.</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-secondary">Linkify.me/johndoe</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-accent">It's one of a kind! </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info text-white">Calm down, John.</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-success text-white">Wow! I can also create blog post?! This is awesome.</div>
            </div>
            <div className="chat chat-end pb-10">
              <div className="chat-bubble chat-bubble-warning text-white">Yow! Check out mine. Linkify.me/arnold</div>
            </div>
</section>

<div className="hero min-h-screen relative bg-cover bg-center" style={{backgroundImage: `url(${Screenshot})`}}>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="hero-content text-center relative z-10">
    <div className="max-w-xl">
      <h1 className="text-[80px] font-bold text-white">What are you waiting for?🤯</h1>
      <p className="py-6 text-white">Create your Linkify and share your profile with the world.</p>
      <div className="flex justify-center pt-5 space-x-3">
            <label className="input input-bordered flex items-center gap-2">Linkify.me/<input type="text" className="grow" placeholder="yourname" /></label>
            <Link to="/login" >
                <button className="btn btn-warning font-bold rounded-lg text-white">Claim your Linkify</button>
            </Link>
            </div>
    </div>
  </div>
</div>


<Footer />
        </>
  )
}

export default Home