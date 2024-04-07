import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage, firestore } from '../config/firebase'; // Import firestore
import AvatarImage from '../assets/avatarImg.png'; // Default avatar image
import Example from '../assets/example.jpg';
import { signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { addDoc, collection, doc, getDocs, getDoc, setDoc, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';

const Dashboard = () => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);
  const [name, setName] = useState('');
  const [nameSaved, setNameSaved] = useState(false);
  const [about, setAbout] = useState ('');
  const [aboutSaved, setAboutSaved] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAbout, setBlogAbout] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [blogImageURL, setBlogImageURL] = useState('');
  const [blogs, setBlogs] = useState([]);
  

  const [twitterUsername, setTwitterUsername] = useState('');
  const [twitterUsernameAdded, setTwitterUsernameAdded] = useState(false);
  const [twitterUsernameInputVisible, setTwitterUsernameInputVisible] = useState(true);
  const [addTwitterButtonVisible, setAddTwitterButtonVisible] = useState(true);
  const [socialMediaUsername, setSocialMediaUsername] = useState('');

  const [facebookUsername, setFacebookUsername] = useState('');
  const [facebookUsernameAdded, setFacebookUsernameAdded] = useState(false);
  const [facebookUsernameInputVisible, setFacebookUsernameInputVisible] = useState(true);
  const [addFacebookButtonVisible, setAddFacebookButtonVisible] = useState(true);

  const [instagramUsername, setInstagramUsername] = useState('');
  const [instagramUsernameAdded, setInstagramUsernameAdded] = useState(false);
  const [instagramUsernameInputVisible, setInstagramUsernameInputVisible] = useState(true);
  const [addInstagramButtonVisible, setAddInstagramButtonVisible] = useState(true);
  

  const [tiktokUsername, setTiktokUsername] = useState('');
  const [tiktokusernameAdded, setTiktokUsernameAdded] = useState(false);
  const [tiktokUsernameInputVisible, setTiktokUsernameInputVisible] = useState(true);
  const [addTiktokButtonVisible, setAddTiktokButtonVisible] = useState(true);



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
      if (!auth.currentUser) {
        console.error("User is not authenticated.");
        return;
      }
  
      // Upload the image to Firebase Storage
      if (avatarFile) {
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
        setSaveClicked(true); // Add this line to set saveClicked to true
  
        // Navigate to the profile page after saving the image
        // history.push('/profile', { avatarURL: downloadURL });
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };
  


// Handle name input logic
const handleSaveName = async () => {
  try {
    // Ensure user is authenticated
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    // Ensure name is not empty
    if (name.trim() === '') {
      console.error("Name cannot be empty.");
      return;
    }

    // Update the existing document in Firestore with the user's UID as the document ID
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: name,
      // Preserve existing about data by retrieving it first and then updating the document
      about: about
    });

    // Set state to indicate name is saved
    setNameSaved(true);
  } catch (error) {
    console.error("Error adding name: ", error);
  }
};

// Handle about input logic
const handleSaveAbout = async () => {
  try {
    // Ensure user is authenticated
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    // Ensure about is not empty
    if (about.trim() === '') {
      console.error("About cannot be empty.");
      return;
    }

    // Update the existing document in Firestore with the user's UID as the document ID
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      // Preserve existing name data by retrieving it first and then updating the document
      name: name,
      about: about
    });

    // Set state to indicate about is saved
    setAboutSaved(true);
  } catch (error) {
    console.error("Error adding about: ", error);
  }
};


// Logic on saving data into the Firestore (database)
useEffect(() => {
  const fetchUserData = async () => {
    try {
      console.log('Fetching user data...');
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log('User data:', userData);
        setName(userData.name);
        setAbout(userData.about); // Set the about state with data from Firestore
        setFacebookUsername(userData.facebookUsername); // Set the Facebook username state with data from Firestore
        setNameSaved(true);
        setAboutSaved(true); // Set aboutSaved to true when about data is retrieved
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (auth.currentUser) {
    fetchUserData();
  }
}, []);

// Handle adding Tiktok username
const handleAddTiktokUsername = async () => {
  try {
    // Check if user is authenticated
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    // Check if Facebook username is empty
    if (tiktokUsername.trim() === '') {
      console.error("Tiktok username cannot be empty.");
      return;
    }

    // Get a reference to the user's document
    const userDocRef = doc(db, 'users', auth.currentUser.uid);

    // Update the authenticated user's document with the Facebook username
    await setDoc(userDocRef, { tiktokUsername: tiktokUsername }, { merge: true });

    // Update state variables
    setTiktokUsernameInputVisible(false);
    setAddTiktokButtonVisible(false);
  } catch (error) {
    console.error("Error adding Tiktok username: ", error);
  }
};

const fetchTiktokUsername = async () => {
  try {
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      console.log('User data:', userData);
      if (userData.tiktokUsername) {
        setTiktokUsername(userData.tiktokUsername);
        setTiktokUsernameAdded(true);
        setTiktokUsernameInputVisible(false);
        setAddTiktokButtonVisible(false);
      }
    } else {
      console.log('User document does not exist.');
    }
  } catch (error) {
    console.error('Error fetching Tiktok data:', error);
  }
};

// Call fetchTwitterUsername when the component mounts
useEffect(() => {
  fetchTiktokUsername();
}, []);

  // Handle adding Insta username
  const handleAddInstagramUsername = async () => {
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        console.error("User is not authenticated.");
        return;
      }
  
      // Check if Facebook username is empty
      if (instagramUsername.trim() === '') {
        console.error("Facebook username cannot be empty.");
        return;
      }
  
      // Get a reference to the user's document
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
  
      // Update the authenticated user's document with the Facebook username
      await setDoc(userDocRef, { instagramUsername: instagramUsername }, { merge: true });
  
      // Update state variables
      setFacebookUsernameInputVisible(false);
      setAddFacebookButtonVisible(false);
    } catch (error) {
      console.error("Error adding Instagram username: ", error);
    }
  };

  const fetchInstagramUsername = async () => {
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log('User data:', userData);
        if (userData.instagramUsername) {
          setInstagramUsername(userData.instagramUsername);
          setInstagramUsernameAdded(true);
          setInstagramUsernameInputVisible(false);
          setAddInstagramButtonVisible(false);
        }
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching Twitter data:', error);
    }
  };
  
  // Call fetchTwitterUsername when the component mounts
  useEffect(() => {
    fetchInstagramUsername();
  }, []);


  // Handle adding Facebook username
  const handleAddFacebookUsername = async () => {
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        console.error("User is not authenticated.");
        return;
      }
  
      // Check if Facebook username is empty
      if (facebookUsername.trim() === '') {
        console.error("Facebook username cannot be empty.");
        return;
      }
  
      // Get a reference to the user's document
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
  
      // Update the authenticated user's document with the Facebook username
      await setDoc(userDocRef, { facebookUsername: facebookUsername }, { merge: true });
  
      // Update state variables
      setFacebookUsernameInputVisible(false);
      setAddFacebookButtonVisible(false);
    } catch (error) {
      console.error("Error adding Facebook username: ", error);
    }
  };

  const fetchFacebookUsername = async () => {
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log('User data:', userData);
        if (userData.twitterUsername) {
          setFacebookUsername(userData.facebookUsername);
          setFacebookUsernameAdded(true);
          setFacebookUsernameInputVisible(false);
          setAddFacebookButtonVisible(false);
        }
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching Twitter data:', error);
    }
  };
  
  // Call fetchTwitterUsername when the component mounts
  useEffect(() => {
    fetchFacebookUsername();
  }, []);
  

const handleAddTwitterUsername = async () => {
  try {
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    if (twitterUsername.trim() === '') {
      console.error("Twitter username cannot be empty.");
      return;
    }

    // Get a reference to the user's document
    const userDocRef = doc(db, 'users', auth.currentUser.uid);

    // Update the authenticated user's document with the Twitter username
    await setDoc(userDocRef, { twitterUsername: twitterUsername }, { merge: true });

    // Update state variables
    setTwitterUsernameAdded(true);
    setTwitterUsernameInputVisible(false);
    setAddTwitterButtonVisible(false);
  } catch (error) {
    console.error("Error adding Twitter username: ", error);
  }
};

// Fetch Twitter username data from Firestore
const fetchTwitterUsername = async () => {
  try {
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      console.log('User data:', userData);
      if (userData.twitterUsername) {
        setTwitterUsername(userData.twitterUsername);
        setTwitterUsernameAdded(true);
        setTwitterUsernameInputVisible(false);
        setAddTwitterButtonVisible(false);
      }
    } else {
      console.log('User document does not exist.');
    }
  } catch (error) {
    console.error('Error fetching Twitter data:', error);
  }
};

// Call fetchTwitterUsername when the component mounts
useEffect(() => {
  fetchTwitterUsername();
}, []);


// Function to handle blog image change
const handleBlogImageChange = (e) => {
  if (e.target.files[0]) {
    setBlogImage(e.target.files[0]);
  }
};

// Function to handle blog title change
const handleBlogTitleChange = (e) => {
  setBlogTitle(e.target.value);
};

// Function to handle blog about change
const handleBlogAboutChange = (e) => {
  setBlogAbout(e.target.value);
};

// Function to handle saving the blog
const handleSaveBlog = async () => {
  try {
    // Check if blog image exists
    if (!blogImage) {
      console.error('Blog image is required.');
      return;
    }

    // Get the UID of the authenticated user
    const user = auth.currentUser;
    const uid = user.uid;

    // Upload blog image to Firebase Storage
    const storageRef = ref(storage, `blogImages/${blogImage.name}`);
    await uploadBytes(storageRef, blogImage);
    const imageURL = await getDownloadURL(storageRef);

    // Save blog information to Firestore with UID
    await addDoc(collection(firestore, 'blogs'), {
      uid: uid,
      title: blogTitle,
      about: blogAbout,
      imageURL: imageURL,
    });

    // Clear input fields after saving
    setBlogTitle('');
    setBlogAbout('');
    setBlogImage(null);
    setBlogImageURL('');
  } catch (error) {
    console.error('Error saving blog:', error);
  }
};

  // Function to fetch and display the saved blog
  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(collection(db, "blogs"), where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      // this prevents the blogs array from accumulating
      // old data in dev mode's HMR
      let blogsArray = [];

      querySnapshot.forEach((doc) => {
        blogsArray.push(doc.data());
      });

      setBlogs(blogsArray);
    };

    fetchBlogs();
  }, [blogs]);
  

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
          <div className="absolute top-[8rem] left-1/2 transform -translate-x-1/2 avatar z-20">
              <div className="w-[16rem] rounded-full">
                  <img src={avatarURL || AvatarImage} alt="Avatar" />
              </div>
          </div>

          {/* Conditional rendering to hide the file input if avatarURL exists */}
          {!avatarURL && (
            <div className="absolute top-[25rem] left-1/2 transform -translate-x-1/2 avatar z-20 space-x-5">
              <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs" onChange={handleFileChange} />
            </div>
          )}
          {/* Render the save button if avatarURL exists and saveClicked is false */}
          <div className={`absolute top-[25rem] left-1/2 transform -translate-x-1/2 avatar z-20" space-x-5 ${!avatarURL || saveClicked ? 'hidden' : ''}`}>
            <button className="btn btn-warning font-bold rounded-lg text-white" onClick={handleSave}>Save</button>
          </div>
        </div>
</section>



<section>
        {/* Name section */}
        <div className="absolute top-[32rem] pb-10 left-1/2 transform -translate-x-1/2 avatar z-20">
          {nameSaved ? (
            <h1 className='font-["Inter Bold"] font-bold text-[3rem] pb-2'>{name}</h1>
          ) : (
            <div>
              <h1 className='font-["Inter Bold"] font-bold pb-2'>Name</h1>
              <input 
                type="text" 
                placeholder="Name" 
                className="w-[20rem] input input-bordered max-w-xs" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <button 
                className="btn btn-warning font-bold rounded-lg text-white" 
                onClick={handleSaveName}
              >
                Save
              </button>
            </div>
          )}
        </div>
        {/* About section */}
        <div className="absolute top-[38rem] max-w-96 left-1/2 transform -translate-x-1/2 avatar z-20">
          {aboutSaved ? (
            <div>
              <h1 className='font-["Inter Bold"] text-center font-bold pb-2'>About Me</h1>
              <h1 className='font-["Inter Bold"] font-sans pb-2'>{about}</h1>
            </div>
          ) : (
            <div>
              <h1 className='font-["Inter Bold"] font-bold pb-2'>About Me</h1>
              <textarea 
                className="textarea w-[20rem] h-[10rem] textarea-bordered" 
                placeholder="Bio"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
              <button 
                className="btn btn-warning font-bold rounded-lg text-white mt-2" 
                onClick={handleSaveAbout}
              >
                Save
              </button>
            </div>
          )}
        </div>

        <section>
      <div className="absolute top-[50rem] max-w-96 left-1/2 transform -translate-x-1/2  z-20">
          <h1 className='font-["Inter Bold"] font-bold pb-2'>Social Media</h1>
          <div className="flex flex-row space-x-5">
              <img
                width={50}
                height={50}
                src="https://img.icons8.com/ios-filled/50/twitterx--v1.png"
                alt="twitterx--v1"
              />
              {twitterUsernameAdded ? (
                <input
                  type="text"
                  placeholder="@username"
                  className="w-[20rem] max-w-xs font-mono"
                  value={twitterUsername}
                  readOnly
                />
              ) : (
                twitterUsernameInputVisible && (
                  <input
                    type="text"
                    placeholder="@username"
                    className="w-[20rem] input input-bordered max-w-xs"
                    value={twitterUsername}
                    onChange={(e) => setTwitterUsername(e.target.value)}
                  />
                )
              )}
              {addTwitterButtonVisible && (
                <button
                  className="btn btn-warning font-bold rounded-lg text-white"
                  onClick={handleAddTwitterUsername}
                >
                  + Add
                </button>
              )}
            </div>

{/* Facebook section */}

<div className="flex flex-row space-x-5 pt-5">
  <img
    width={50}
    height={50}
    src="https://img.icons8.com/color/48/facebook.png"
    alt="facebook"
  />
  {facebookUsernameAdded ? (
    <input
      type="text"
      placeholder="@username"
      className="w-[20rem] max-w-xs font-mono"
      value={facebookUsername} // This value might be causing the warning
      readOnly
    />
  ) : (
    facebookUsernameInputVisible && (
      <input
        type="text"
        placeholder="@username"
        className="w-[20rem] input input-bordered max-w-xs"
        value={facebookUsername} // This value might be causing the warning
        onChange={(e) => setFacebookUsername(e.target.value)}
      />
    )
  )}
  {addFacebookButtonVisible && (
    <button
      className="btn btn-warning font-bold rounded-lg text-white"
      onClick={handleAddFacebookUsername}
    >
      + Add
    </button>
  )}
</div>

      {/* Instagram section */}
{/* Instagram section */}
<div className="flex flex-row space-x-5 pt-5">
  <img
    width={50}
    height={50}
    src="https://img.icons8.com/fluency/48/instagram-new.png"
    alt="instagram-new"
  />
  {instagramUsernameAdded ? (
    <input
      type="text"
      placeholder="@username"
      className="w-[20rem] max-w-xs font-mono"
      value={instagramUsername}
      readOnly
    />
  ) : (
    instagramUsernameInputVisible && (
      <input
        type="text"
        placeholder="@username"
        className="w-[20rem] input input-bordered max-w-xs"
        value={instagramUsername}
        onChange={(e) => setInstagramUsername(e.target.value)} // Update setInstagramUsername here
      />
    )
  )}
  {addInstagramButtonVisible && (
    <button
      className="btn btn-warning font-bold rounded-lg text-white"
      onClick={handleAddInstagramUsername}
    >
      + Add
    </button>
  )}
</div>

<div className="flex flex-row space-x-5 pt-5">
<img
          width={50}
          height={50}
          src="https://img.icons8.com/ios-filled/50/tiktok--v1.png"
          alt="tiktok--v1"
        />
  {tiktokusernameAdded ? ( // Corrected variable name here
    <input
      type="text"
      placeholder="@username"
      className="w-[20rem] max-w-xs font-mono"
      value={tiktokUsername}
      readOnly
    />
  ) : (
    tiktokUsernameInputVisible && (
      <input
        type="text"
        placeholder="@username"
        className="w-[20rem] input input-bordered max-w-xs"
        value={tiktokUsername}
        onChange={(e) => setTiktokUsername(e.target.value)}
      />
    )
  )}
  {addTiktokButtonVisible && (
    <button
      className="btn btn-warning font-bold rounded-lg text-white"
      onClick={handleAddTiktokUsername}
    >
      + Add
    </button>
  )}
</div>
</div>
  </section>



  <div className="absolute top-[69rem] max-w-96 left-1/2 transform -translate-x-1/2  z-20">

    {/* TODO: change logic show indefinitely when user has a 'paid' property on users collection */}
    {blogs.length < 1 && (
      <>
        <h1 className='font-["Inter Bold"] font-bold pb-2'>Create new blog</h1>
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
          <input type="file" id="uploadFile1" className="hidden" onChange={handleBlogImageChange} />
          <p className="text-xs text-gray-400 mt-2">
            PNG, JPG SVG, WEBP, and GIF are Allowed.
          </p>
        </label>

        <div className="absolute top-[83rem] max-w-96 left-1/2 transform -translate-x-1/2  z-20">
          <input type="text" placeholder="Blog Title" className="w-[20rem] input input-bordered max-w-xs" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
        </div>
        <div className="absolute top-[87rem] max-w-96 left-1/2 transform -translate-x-1/2  z-20">
          <textarea className="textarea w-[20rem] h-[10rem] textarea-bordered" placeholder="About" value={blogAbout} onChange={(e) => setBlogAbout(e.target.value)}></textarea>
        </div>
        <div className="absolute top-[98rem] max-w-96 left-1/2 transform -translate-x-1/2  z-20">
          <button className="btn btn-warning font-bold rounded-lg text-white mt-2" onClick={handleSaveBlog}>Save</button>
        </div>
      </>
    )}
    </div>

      <h1 className='absolute top-[102rem] max-w-96 left-1/2 transform -translate-x-1/2 z-20 font-["Inter Bold"] font-bold pb-2'>Blogs</h1>
      <div className="columns-3 gap-8 top-[106rem] absolute left-1/2 max-w-[90%] transform -translate-x-1/2 mx-auto z-20">
      {blogs.map(blog => (
          <div key={blog.uid} className="max-w-96">
            <img src={blog.imageURL} alt="Blog image" className="aspect-square object-cover w-[20rem] h-[10rem] mb-4" />
            <input type="text" placeholder="Blog Title" className="w-[20rem] input input-bordered max-w-xs" value={blog.title} onChange={(e) => setBlogTitle(e.target.value)} />
            <textarea className="textarea w-[20rem] h-[10rem] textarea-bordered my-2" placeholder="About" value={blog.about} onChange={(e) => setBlogAbout(e.target.value)}></textarea>
            <button className="btn btn-warning font-bold rounded-lg text-white mt-2" onClick={handleSaveBlog}>Save</button>
          </div>
      ))}
        </div>
  </section>
    </>
  )
}

export default Dashboard