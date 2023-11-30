import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaCalendar, FaCartPlus, FaStar, FaListAlt, FaAd, FaSearch, FaEnvelope, FaUsers, FaList, FaBook, FaUser } from 'react-icons/fa';
import { ImSpoonKnife } from 'react-icons/im';
import { BsCart3 } from 'react-icons/bs';
// Add other necessary imports based on your project structure and requirements
// import useCart from '../hooks/useCart';
// import useAdmin from '../hooks/useAdmin';


const Dashboard = () => {
    // const [cart] = useCart();

    // TODO: get isAdmin from the database
    // const [isAdmin] = useAdmin();
    return (
        <div className='flex py-16 '>
            <div className="w-60 min-h-[850px] bg-gray-700 rounded-s-2xl text-sky-500">
                {/* side bar */}
                <ul className='menu'>
                        {/* // isAdmin ?
                        // <>
                        //     <li className='px-2 py-2 text-base  font-medium'>
                        //         <NavLink to='/dashboard/adminHome'><FaHome /> Admin Home</NavLink>
                        //     </li>
                        //     <li className='px-2 py-2 text-base  font-medium'>
                        //         <NavLink to='/dashboard/addItems'><ImSpoonKnife />Add Items</NavLink>
                        //     </li>
                        //     <li className='px-2 py-2 text-base  font-medium'>
                        //         <NavLink to='/dashboard/manageItems'><FaList /> Manage Items</NavLink>
                        //     </li>
                        //     <li className='px-2 py-2 text-base  font-medium'>
                        //         <NavLink to='/dashboard/bookings'><FaBook /> Manage Bookings</NavLink>
                        //     </li>
                        //     <li className='px-2 py-2 text-base  font-medium'>
                        //         <NavLink to='/dashboard/users'><FaUsers /> All Users</NavLink>
                        //     </li>
                        // </>
                        // : */}
                    {/* <li className='px-2 py-2 text-base  font-medium'>
                        <NavLink to='/dashboard/userHome'><FaHome /> User Home</NavLink>
                    </li> */}
                    <li className='px-2 py-2 text-base  font-medium'>
                        <NavLink to='/dashboard/profile'><FaUser /> Profile</NavLink>
                    </li>
                    <li className='px-2 py-2 text-base  font-medium'>
                        <NavLink to='/dashboard/myPost'><BsCart3 /> My Post()</NavLink>
                    </li>
                    <li className='px-2 py-2 text-base  font-medium'>
                        <NavLink to='/dashboard/addPost'><FaAd /> Add a Post</NavLink>
                    </li>

                    {/* Shered links */}
                    <div className='divider px-4'></div>

                    <li className='px-2 py-2 text-base  font-medium'>
                        <NavLink to='/'><FaHome />Home</NavLink>
                    </li>
                    <li className='px-2 py-2 text-base  font-medium'>
                        <NavLink to='/order/salad'><FaSearch />Menu</NavLink>
                    </li>
                    <li className='px-2 py-2 text-base  font-medium'>
                        <NavLink to='/order/contact'><FaEnvelope />Contact</NavLink>
                    </li>
                    <li className='px-2 py-2 text-base  font-medium'>
                        <NavLink to='/order/salad'><FaSearch />Menu</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 px-16 py-10 bg-sky-100">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Dashboard