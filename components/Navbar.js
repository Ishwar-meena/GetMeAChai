'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from "next-auth/react"
import { toast } from 'react-toastify';
import Link from 'next/link';
import { fetchUserName } from '@/actions/serverActions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbar = React.memo(() => {
  const [dropdown, setDropdown] = useState(false);
  const [username, setUsername] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const getUserName = async () => {
      if (session && session.user?.email) {
        const user = await fetchUserName(session.user?.email);
        setUsername(user);
      }
    }
    getUserName();
  }, [session]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  }

  return (
    <nav className="relative flex items-center justify-between sm:px-8 px-2 py-2 bg-blue-950">
      <div className="sm:text-2xl text-xl flex items-center gap-2 cursor-pointer text-white">
        <Image
          width={40}
          height={40}
          src="/tea.gif"
          alt="tea"
          className="h-10 invert-75"
        />
        <Link href={'/'}>GetMeAChai</Link>
      </div>

      {/* Hamburger Menu Button */}
      <button
        className="sm:hidden cursor-pointer text-white z-50"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {mobileMenu ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Navigation Items */}
      <div className={`${mobileMenu ? 'flex' : 'hidden'} sm:flex absolute z-10 sm:relative top-0 right-0 sm:top-auto w-full sm:w-auto h-screen sm:h-auto bg-blue-950 sm:bg-transparent flex-col sm:flex-row items-center justify-center sm:justify-end gap-6 sm:gap-9 transition-all duration-300 ease-in-out`}>
        {session ? (
          <ul className="flex flex-col sm:flex-row items-center gap-6 sm:gap-9">
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown((prev) => !prev)}
                className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-3 py-1 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                className={`absolute right-0 mt-2 z-10 ${dropdown ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                  </li>
                  <li>
                    <Link href={`/${username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Page</Link>
                  </li>
                  <li>
                    <Link href='/' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Homepage</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <button onClick={handleLogout} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">LogOut</button>
            </li>
          </ul>
        ) : (
          <Link href={'/login'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Login</Link>
        )}
      </div>
    </nav>
  );
});

export default Navbar;