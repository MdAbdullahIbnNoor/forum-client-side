import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaFileAlt,
  FaExclamationCircle,
  FaUsers,
} from 'react-icons/fa';
import { MdOutlinePostAdd } from 'react-icons/md';
import { BiNotification, BiMessageSquareDetail } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi2';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex lg:py-16'>
      <div className='w-20 lg:w-60 min-h-[660px] lg:min-h-[850px] bg-gray-700 lg:rounded-s-2xl text-sky-500'>
        {/* side bar */}
        <ul className='menu'>
          {isAdmin ? (
            <>
              <li className='lg:px-2 py-2 text-sm lg:text-base font-medium'>
                <NavLink to='/dashboard/adminHome'>
                  {isMobile ? <FaHome className='text-2xl' /> : <><FaHome /> Admin Home</>}
                </NavLink>
              </li>
              <li className='lg:px-2 py-2 text-sm lg:text-base font-medium'>
                <NavLink to='/dashboard/addAnnouncement'>
                  {isMobile ? <BiNotification className='text-2xl' /> : <><BiNotification /> Add Announcement</>}
                </NavLink>
              </li>
              <li className='lg:px-2 py-2 text-sm lg:text-base font-medium'>
                <NavLink to='/dashboard/manageReports'>
                  {isMobile ? <FaExclamationCircle className='text-2xl' /> : <><FaExclamationCircle /> Manage Reports</>}
                </NavLink>
              </li>
              <li className='lg:px-2 py-2 text-sm lg:text-base font-medium'>
                <NavLink to='/dashboard/users'>
                  {isMobile ? <FaUsers className='text-2xl' /> : <><FaUsers /> All Users</>}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className='lg:px-2 py-2 text-sm lg:text-base font-medium'>
                <NavLink to='/dashboard/profile'>
                  {isMobile ? <FaUser className='text-2xl' /> : <><FaUser /> Profile</>}
                </NavLink>
              </li>
              <li className='lg:px-2 py-2 text-sm lg:text-base font-medium'>
                <NavLink to='/dashboard/myPost'>
                  {isMobile ? <FaFileAlt className='text-2xl'/> : <><FaFileAlt /> My Post</>}
                </NavLink>
              </li>
              <li className='lg:px-2 py-2 text-sm lg:text-base font-medium'>
                <NavLink to='/dashboard/addPost'>
                  {isMobile ? <MdOutlinePostAdd className='text-2xl'/> : <><MdOutlinePostAdd /> Add a Post</>}
                </NavLink>
              </li>
            </>
          )}

          {/* Shared links */}
          <div className='divider-info mx-4 my-4'></div>

          <li className='lg:px-2 py-2 text-sm lg:text-base font-medium'>
            <NavLink to='/'>
              {isMobile ? <HiHome className='text-2xl'/> : <><HiHome /> Home</>}
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className='flex-1 px-4 py-4 lg:px-16 lg:py-10 bg-sky-100 overflow-scroll'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
