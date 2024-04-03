import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../config/firebase';
import AvatarImage from '../assets/avatarImg.png'; // Default avatar image
import Example from '../assets/example.jpg';
import { signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false); // State to track if the save button is clicked

  // Fetch user's avatar URL from Firebase Storage
  const fetchAvatarURL = async () => {
    try {
      if (!auth.currentUser) {
        console.error("User is not authenticated.");
        return;
      }

      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}/AboutMe.jpg`);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Avatar URL:", downloadURL); // Log the avatar URL
      setAvatarURL(downloadURL);
    } catch (error) {
      console.error("Error fetching avatar URL:", error);
    }
  };

  // Fetch user's avatar URL when component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchAvatarURL(); // Fetch avatar URL when user logs in
      } else {
        setAvatarURL(null); // Clear avatar URL when user logs out
      }
    });

    return unsubscribe;
  }, []);

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
      });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
    setAvatarURL(URL.createObjectURL(e.target.files[0])); // Display selected image immediately
  };

  // Handle save
  const handleSave = async () => {
    try {
      if (!auth.currentUser || !avatarFile) {
        console.error("User is not authenticated or no file selected.");
        return;
      }

      // Upload the image to Firebase Storage
      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}/AboutMe.jpg`);
      await uploadBytes(storageRef, avatarFile);
      const downloadURL = await getDownloadURL(storageRef);

      // Update the user's photoURL with the download URL
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL
      });

      // Log success message
      console.log("Image saved successfully!");
      
      // Update saveClicked state to hide the save button
      setSaveClicked(true);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <>
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a onClick={handleLogout}>Log Out
        </a></li>
        <li><a>Share</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <img src={Logo} alt="Logo" className="w-30 h-10" />
  </div>

</div>
<section>
  <div className="relative">
    <div className="grid grid-cols-3 min-h-[16rem] py-6 px-16 font-[sans-serif] overflow-hidden" style={{ backgroundImage: `url(${Example})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
    <div className="absolute top-[8rem] left-0 avatar pl-16 z-20">
      <div className="w-[16rem] rounded-full">
        <img src={avatarURL || AvatarImage} alt="Avatar" />
      </div>
    </div>
    {/* Conditional rendering to hide the file input if avatarURL exists */}
    {!avatarURL && (
      <div className="absolute top-[25rem] left-10 avatar pl-16 z-20 space-x-5">
        <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs" onChange={handleFileChange} />
      </div>
    )}
  </div>
  {/* Render the save button always */}
  <div className={`absolute top-[27rem] left-10 avatar pl-16 z-20 space-x-5 ${saveClicked ? 'hidden' : ''}`}>
    <button className="btn btn-warning font-bold rounded-lg text-white" onClick={handleSave}>Save</button>
  </div>
</section>



<section>
  <div className="absolute top-[30rem] space-x-2  left-10  pl-16 z-20">
      <h1 className='font-["Inter Bold"] font-bold pb-2'>Name</h1>
      <input type="text" placeholder="Name" className="w-[20rem] input input-bordered max-w-xs" />  
      <button className="btn btn-warning font-bold rounded-lg text-white" >Save</button>
  </div>
  <div className="absolute top-[36rem] space-x-2 left-10 pl-16 z-20">
      <h1 className='font-["Inter Bold"] font-bold pb-2'>About Me</h1>
      <textarea className="textarea w-[20rem] h-[10rem] textarea-bordered" placeholder="Bio"></textarea>   
  </div>
  <div className="absolute top-[50rem] space-x-2 left-10 pl-16 z-20">
      <button className="btn btn-warning font-bold rounded-lg text-white" >Save</button>  
  </div>

  <div className="absolute top-[55rem] space-x-2  left-10 pl-16 z-20">
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

      <div className="absolute top-[70rem]  left-10  pl-16 z-20">
          <input type="text" placeholder="Blog Title" className="w-[20rem] input input-bordered max-w-xs" />  
      </div>
      <div className="absolute top-[65rem] left-10 pl-16 z-20">
          <textarea className="textarea w-[20rem] h-[10rem] textarea-bordered" placeholder="About"></textarea>
      </div>
      <div className="absolute top-[77rem] space-x-5 pb-10 left-10 pl-16 z-20">
      {/* <button className="btn btn-warning font-bold rounded-lg text-white" onClick={handleSave}>Save</button> */}
         <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
            onClick={handleLogout} // Add this line to attach handleLogout function to the onClick event
          >
            Log out
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
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