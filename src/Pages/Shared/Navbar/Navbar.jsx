import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { CgLogOut } from "react-icons/cg";
// import { BsCart3 } from "react-icons/bs";
import avater from '../../../assets/avater.png';
// import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
// import useAdmin from '../../../hooks/useAdmin';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useAuth();
    // const [isAdmin] = useAdmin()
    // const [cart] = useCart();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logOut()
            .then(res => console.log("logout successfully"))
            .catch(err => console.log(err))
    }

    return (
        <nav className="lg:fixed relative bg-opacity-30 bg-gray-800 shadow z-10 w-full lg:max-w-screen-2xl">
            <div className="px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between  lg:flex-grow ">
                        <a href="/">
                            <img
                                className="w-20 lg:w-36 h-full sm:h-7 object-cover"
                                src={logo}
                                alt=""
                            />
                        </a>

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
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen
                            ? 'translate-x-0 opacity-100'
                            : 'opacity-0 -translate-x-full'
                            }`}
                    >
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:ml-24 lg:mr-5 lg:w-3/5">
                            <NavLink
                                to="/"
                                className="px-3 py-2 mx-2 text-base text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Home
                            </NavLink>
                            {/* <NavLink
                                to="/menu"
                                className="px-3 py-2 mx-2 text-base text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Menu
                            </NavLink> */}
                            {/* <NavLink
                                to="/order/salad"
                                className="px-3 py-2 mx-2 text-base text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Order
                            </NavLink> */}
                            {/* {
                                user && isAdmin && <NavLink
                                    to="/dashboard/adminHome"
                                    className="px-3 py-2 mx-2 text-base text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Dashboard
                                </NavLink>
                            } */}
                            {/* {
                                user && !isAdmin && <NavLink
                                    to="/dashboard/userHome"
                                    className="px-3 py-2 mx-2 text-base text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Dashboard
                                </NavLink>
                            } */}
                            {
                                user ? "" : <NavLink
                                    to="login"
                                    className="px-3 py-2 mx-2 text-base text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Login
                                </NavLink>
                            }

                            {/* <NavLink
                                to="/dashboard/cart"
                                className="mx-0 text-base text-white rounded-md lg:mt-0 w-24"
                            >
                                <button className="btn btn-outline btn-info flex justify-center items-center w-24">
                                    <BsCart3 className='text-xl' />
                                    <div className="badge-xm badge-warning text-xs p-1 rounded-full">+{cart.length}</div>

                                </button>
                            </NavLink> */}


                        </div>

                        <div className="flex items-center mt-4 lg:mt-0">

                            {
                                user ? <button
                                    onClick={handleLogout}
                                    className="hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                                    aria-label="show notifications"
                                >
                                    <CgLogOut
                                        className="w-8 h-8"
                                        fill="none"
                                    />
                                </button> : ""
                            }

                            <button
                                type="button"
                                className="flex items-center focus:outline-none"
                                aria-label="toggle profile dropdown"
                            >
                                {
                                    user && <div className='flex justify-center items-center gap-2 border-2 px-4 py-1 rounded-3xl bg-gray-600'>
                                        <span className='text-sm font-semibold text-gray-100'>{user?.displayName}</span>
                                        <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                                            <img
                                                src={user?.photoURL || avater}
                                                className="object-cover w-9 h-9"
                                                alt="avatar"
                                            />
                                        </div>
                                    </div>
                                }

                                <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                                    {user?.displayName}
                                </h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
