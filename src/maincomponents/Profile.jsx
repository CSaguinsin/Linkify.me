import React from 'react';
import AvatarImage from '../assets/avatarImg.png'; // Default avatar image
import Example from '../assets/example.jpg';
const Profile = ({ avatarURL, name, about, setName, setAbout }) => {
  return (
    <>
      <section>
        {/* Your existing code for Navbar */}
      </section>

      <section>
        <div className="grid grid-cols-3 min-h-[16rem] py-6 px-16 font-[sans-serif] overflow-hidden" style={{ backgroundImage: `url(${Example})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute top-[10rem] avatar pl-16 z-20">
          <div className="w-[16rem] rounded-full">
            {/* Use the avatarURL prop to display the image */}
            <img src={avatarURL || AvatarImage} alt="Avatar" />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-12">
          <div className="text-center">
            {/* Display user's name */}
            <h1 className="text-3xl font-bold">{name}</h1>
            {/* Display user's about */}
            <p className="text-lg mt-4">{about}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
