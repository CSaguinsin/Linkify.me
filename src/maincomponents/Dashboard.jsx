import React from 'react'
import Me from '../assets/AboutMe.jpg';
import Example from '../assets/example.jpg'
const Dashboard = () => {
  return (
    <>  
  <section>
      <div className="relative">
          <div className="grid grid-cols-3 min-h-[16rem] py-6 px-16 font-[sans-serif] overflow-hidden" style={{ backgroundImage: `url(${Example})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className="absolute top-[8rem] left-0 avatar pl-16 z-20">
            <div className="w-[16rem] rounded-full">
              <img src={Me} />
            </div>
          </div>
      </div>
  </section>

<section>
  <div className="absolute top-[25rem]  left-10  pl-16 z-20">
      <h1 className='font-["Inter Bold"] font-bold pb-2'>Name</h1>
      <input type="text" placeholder="Name" className="w-[20rem] input input-bordered max-w-xs" />  
  </div>
  <div className="absolute top-[32rem] left-10 pl-16 z-20">
      <h1 className='font-["Inter Bold"] font-bold pb-2'>About Me</h1>
      <textarea className="textarea w-[20rem] h-[10rem] textarea-bordered" placeholder="Bio"></textarea>
  </div>

  <div className="absolute top-[45rem] left-10 pl-16 z-20">
      <h1 className='font-["Inter Bold"] font-bold pb-2'>Blogs</h1>
          <label
              htmlFor="uploadFile1"
              className="bg-white text-center rounded w-full sm:w-[360px] min-h-[160px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 mx-auto font-[sans-serif] m-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 mb-6 fill-gray-400"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z"
                  data-original="#000000"
                />
                <path
                  d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z"
                  data-original="#000000"
                />
              </svg>
              <p className="text-gray-400 font-semibold text-sm">
                Drag &amp; Drop or <span className="text-[#007bff]">Choose file</span> to
                upload
              </p>
              <input type="file" id="uploadFile1" className="hidden" />
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG SVG, WEBP, and GIF are Allowed.
              </p>
            </label>         
  </div>

      <div className="absolute top-[60rem]  left-10  pl-16 z-20">
          <input type="text" placeholder="Blog Title" className="w-[20rem] input input-bordered max-w-xs" />  
      </div>
      <div className="absolute top-[65rem] left-10 pl-16 z-20">
          <textarea className="textarea w-[20rem] h-[10rem] textarea-bordered" placeholder="About"></textarea>
      </div>
      <div className="absolute top-[77rem] pb-10 left-10 pl-16 z-20">
         <button className=" btn btn-warning font-bold rounded-lg text-white">Claim your Linkify</button>
      </div>
  </section>

  <section>
      <div className="absolute top-[25rem] right-80  z-20">
          <h1 className='font-["Inter Bold"] font-bold pb-2'>Social Media</h1>
          <div className="flex flex-row space-x-5 ">      
          <img
            width={50}
            height={50}
            src="https://img.icons8.com/ios-filled/50/twitterx--v1.png"
            alt="twitterx--v1"
          />
              <input type="text" placeholder="@username" className="w-[20rem] input input-bordered max-w-xs" />
              <button className=" btn btn-warning font-bold rounded-lg text-white">+ Add</button>  
          </div>

          <div className="flex flex-row space-x-5 pt-5 ">       
          <img
            width={50}
            height={50}
            src="https://img.icons8.com/color/48/facebook.png"
            alt="facebook"
          />

              <input type="text" placeholder="@username" className="w-[20rem] input input-bordered max-w-xs" />  
              <button className=" btn btn-warning font-bold rounded-lg text-white">+ Add</button>
          </div>

          <div className="flex flex-row space-x-5 pt-5 ">       
          <img
            width={50}
            height={50}
            src="https://img.icons8.com/fluency/48/instagram-new.png"
            alt="instagram-new"
          />

              <input type="text" placeholder="@username" className="w-[20rem] input input-bordered max-w-xs" /> 
              <button className=" btn btn-warning font-bold rounded-lg text-white">+ Add</button> 
          </div>

          <div className="flex flex-row space-x-5 pt-5 ">       
          <img
              width={50}
              height={50}
              src="https://img.icons8.com/ios-filled/50/tiktok--v1.png"
              alt="tiktok--v1"
            />

              <input type="text" placeholder="@username" className="w-[20rem] input input-bordered max-w-xs" />  
              <button className=" btn btn-warning font-bold rounded-lg text-white">+ Add</button>
          </div>

      </div>
  </section>
    </>
  )
}

export default Dashboard