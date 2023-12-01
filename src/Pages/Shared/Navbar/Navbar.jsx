import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
// import avatar from '../../../assets/avatar.png';
import useAuth from '../../../hooks/useAuth';
import { IoIosNotifications } from "react-icons/io";
import useAnnouncements from '../../../hooks/useAnnouncements';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const { user, logOut } = useAuth();
  const { announcements, loading } = useAnnouncements();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setNotificationsOpen(false); // Close notifications when opening mobile menu
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!isNotificationsOpen);
    setMobileMenuOpen(false); // Close mobile menu when opening notifications
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
                type="button"
                onClick={toggleMobileMenu}
                className="flex items-center focus:outline-none"
                aria-label="toggle profile dropdown"
              >
                {!isMobileMenuOpen ? (
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
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isMobileMenuOpen
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
              <div className="relative inline-block mx-2">
                {/* Dropdown toggle button */}
                <button
                  onClick={toggleNotifications}
                  className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-transparent focus:outline-none"
                >
                  <IoIosNotifications className="text-2xl hover:text-gray-100" />
                  {/* Display the number of announcements */}
                  <p
                    style={{ display: announcements.length > 0 ? 'block' : 'none' }}
                    className="absolute top-0 right-0 text-red-600 font-bold"
                  >
                    {announcements.length}
                  </p>
                </button>

                {/* Dropdown menu */}
                <div
                  style={{ display: isNotificationsOpen ? 'block' : 'none' }}
                  onClick={() => setNotificationsOpen(false)}
                  className="absolute right-0 z-20 w-64 mt-2 overflow-hidden origin-top-right bg-white shadow-lg sm:w-80 dark:bg-gray-800"
                >
                  <div className="py-2">
                    {/* Iterate over announcements and display each one */}
                    {announcements.map((announcement) => (
                      <div
                        key={announcement._id}
                        className="p-2 border-b-2 border-gray-300 bg-gray-700 flex gap-5"
                      >
                        <div className="flex flex-col items-center self-stretch justify-center w-1/5">
                          <img
                            src={announcement.authorImage}
                            className="h-10 w-10 rounded-full"
                            alt=""
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold mb-1 text-white">
                            {announcement.title.slice(0, 20)}
                          </h3>
                          <p className="text-sky-400 font-semibold">
                            {announcement.description.slice(0, 20)}......
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="block py-2 font-bold text-center text-white bg-gray-800 dark:bg-gray-700 hover:underline"
                  >
                    See all announcements
                  </a>
                </div>
              </div>

              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleMobileMenu}
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

                  {isMobileMenuOpen && (
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
      </div >
    </nav >
  );
};

export default Navbar;
