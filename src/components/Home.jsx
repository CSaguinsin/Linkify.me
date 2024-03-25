import React from 'react'
import Sample from '../assets/carlsaginsin.png';

const Home = () => {
  return (
        <>
            <h1 className='text-center pt-[50px] font-bold text-[80px]'>
            Where Every <span className="text-[#FF914D]">Link</span> Leads <br /> to <span className="text-[#FF914D]">Possibility</span>
            </h1>
            <div className="flex justify-center pt-5 space-x-3">
                <input type="text" placeholder="Linkify.me/" className="input input-bordered input-accent w-full max-w-xs" />
                <button className="btn btn-warning font-bold rounded-lg text-white">Claim your Linkify</button>
            </div>

            <div className='flex pt-5 items-center justify-center'>
    <img src={Sample} alt="sample" className="w-[70rem] rounded-lg shadow-lg" />
</div>

        </>
  )
}

export default Home