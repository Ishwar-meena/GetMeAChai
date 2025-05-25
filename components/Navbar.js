'use client';
import React,{ useState, useEffect, useRef } from 'react';
import { useSession, signOut } from "next-auth/react"
import { toast } from 'react-toastify';
import Link from 'next/link';

const Navbar = React.memo(() => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session } = useSession();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async() => {
    try {
      await signOut({ redirect: false });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  }
  
  return (
    <nav className="flex items-center justify-between px-8 py-2 bg-blue-950">
      <div className="text-2xl flex items-center gap-2 cursor-pointer text-white">
        <img src="tea.gif" alt="tea" className="h-10 invert-75" />
        <Link href={'/'}>GetMeAChai</Link>
      </div>
      {session ?
        <ul className="flex items-center justify-between gap-9">
          <li className="relative" ref={dropdownRef}>
            {/* Toggle Button */}
            <button
              onClick={() => setDropdown((prev) => !prev)}
              className="text-white  cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg  px-3 py-1 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              <img src={session && session.user.image} alt={session.user.img && session.user.name} className='h-9 mr-1.5 rounded-full' />
              {session ? session.user.name : "none"}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 z-10 ${dropdown ? '' : 'hidden'
                } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={session && session.user.name} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Page</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <button onClick={handleLogout} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  cursor-pointer " >LogOut</button>
          </li>
        </ul>
        :
        <Link href={'/login'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  cursor-pointer">Login</Link>
      }
    </nav>
  );
});

export default Navbar;

