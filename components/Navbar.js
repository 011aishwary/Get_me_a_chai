"use client"
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

import Coffeemug from './Coffeemug'
import Link from 'next/link'
// import Dashboard from '@/app/dashboard/page'


const Navbar = () => {
  const { data: session } = useSession()
  const [showDropDown, setshowDropDown] = useState(false)
  // if(session) {
  //   console.log(session.user)
  //   console.log(session.user.name)    
  // }

  return (
    <nav>
      <header className="bg-white  dark:bg-[#3b2f30] shadow-lg">
        <nav className="container mx-auto px-8 py-2 flex justify-between items-center">
          <div className="flex items-center">

            <span>

              <Coffeemug />
            </span>
            <Link href="/" className="text-xl text-center font-bold text-indigo-800 dark:text-white transition-colors duration-300">Get Me a Chai
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="#" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Home</Link>
            <Link href="#" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">About</Link>
            <Link href="#" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Services</Link>
            <Link href="#" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Contact</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {session && <>
              {/* dropdown content */}

              <button onClick={() => { setshowDropDown(!showDropDown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-3 relative bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{(session.user.name && session.user.name.split(" ")[0]) || "User"}{" "} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
              </button>

              {showDropDown && (
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setshowDropDown(false)}
                  style={{ background: 'transparent' }}
                />
              )}


              <div id="dropdown" className={`z-20 ${showDropDown ? "" : "hidden"}  absolute top-16 ml-3 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <Link onClick={() => setshowDropDown(false)} href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >
                      Dashboard</Link>
                  </li>
                  <li>
                    <Link onClick={() => setshowDropDown(false)} href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">your Page</Link>
                  </li>
                  <li>
                    <Link onClick={() => setshowDropDown(false)} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                  </li>
                  <li>
                    <Link onClick={() => { signOut() }} href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                  </li>
                </ul>
              </div>



            </>


            }
            {session && <Link href={"/Logout"}>
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Sign Out</button>
            </Link>}
            {!session && <Link href={"/Login"}>
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Sign Up</button>
            </Link>}

          </div>
          <button id="mobileMenuButton" className="md:hidden text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white focus:outline-none transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
        <div id="mobileMenu" className="mobile-menu md:hidden bg-white dark:bg-gray-800 shadow-lg absolute w-full left-0 transform -translate-y-full opacity-0">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="#" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Home</Link>
            <Link href="#" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">About</Link>
            <Link href="#" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Services</Link>
            <Link href="#" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Contact</Link>
            <Link href="#" className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Sign Up</Link>
          </div>
        </div>
      </header>
    </nav>
  )
}

export default Navbar
