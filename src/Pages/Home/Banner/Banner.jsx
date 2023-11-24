import React from 'react';
import banner from '../../../assets/bannerBg2.jpg';
import { IoSearch } from "react-icons/io5";

const Banner = () => {
  return (
    <div className="hero min-h-[550px] bg-cover bg-no-repeat mb-20" style={{backgroundImage: `url(${banner})`}}>
      <div className="hero-overlay bg-opacity-20"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md mx-auto">
          <h1 className="mb-5 text-5xl font-bold text-white">Forum Flow</h1>
          <p className="mb-5">Join the conversation in our vibrant community. Share your thoughts and learn from others.</p>
          <div className="mb-5 flex items-center relative">
            <input
              type="text"
              className="input input-bordered input-info w-full text-gray-800 px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full"
              placeholder="Search for tags..."
            />
            <IoSearch className='text-3xl text-gray-800 absolute right-5'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
