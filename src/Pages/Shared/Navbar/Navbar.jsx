import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
// import avatar from '../../../assets/avatar.png';
import useAuth from '../../../hooks/useAuth';
import { IoIosNotifications } from "react-icons/io";
import useAnnouncements from '../../../hooks/useAnnouncements';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { announcements, loading } = useAnnouncements();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logOut()
      .then(() => console.log('Logout successfully'))
      .catch((err) => console.log(err));
  };

  return (
    <nav className="lg:fixed relative bg-opacity-30 bg-gray-800 shadow z-10 w-full lg:max-w-screen-2xl">
      <div className="px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between  lg:flex-grow ">
            <NavLink to="/">
              <img
                className="w-20 lg:w-44 h-full sm:h-7 object-cover"
                src={logo}
                alt=""
              />
            </NavLink>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? 'translate-x-0 opacity-100'
                : 'opacity-0 -translate-x-full'
            }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:ml-24 lg:mr-5 lg:w-full">
              <NavLink
                to="/"
                className="px-3 py-2 mx-2 text-base text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </NavLink>
              <NavLink
                to="/membership"
                className="px-3 py-2 mx-2 text-base text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Membership
              </NavLink>
              <NavLink
                to="#"
                className="px-3 py-1 w-16 btn btn-circle btn-info btn-outline mx-2 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
              >
                <IoIosNotifications className='text-2xl hover:text-gray-100' /><p className='absolute top-2 right-4 text-red-600 font-bold'>{announcements.length}</p>
              </NavLink>
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="flex items-center focus:outline-none"
                    aria-label="toggle profile dropdown"
                  >
                    <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                      <img
                        src={user.photoURL || avatar}
                        className="object-cover w-full h-full"
                        alt="avatar"
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="absolute right-0 mt-2 py-2 bg-white border rounded-md shadow-lg w-36">
                      <span className="block px-4 py-2 text-sm text-gray-700">
                        {user.displayName}
                      </span>
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="px-4 py-2 mx-2 text-base font-semibold text-white transition-colors duration-300 transform bg-info rounded-md lg:mt-0 hover:bg-sky-600 "
                >
                  Join Us
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
