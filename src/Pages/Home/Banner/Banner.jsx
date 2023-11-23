import React from 'react';

const Banner = () => {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md mx-auto">
          <h1 className="mb-5 text-5xl font-bold">Your Forum Name</h1>
          <p className="mb-5">Join the conversation in our vibrant community. Share your thoughts and learn from others.</p>
          <div className="mb-5">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Search for tags..."
            />
          </div>
          <button className="btn btn-primary">Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
