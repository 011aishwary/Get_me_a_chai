"use client"
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

import Coffeemug from './Coffeemug'
import Link from 'next/link'
// import Dashboard from '@/app/dashboard/page'


const Navbar = () => {
  const { data: session } = useSession()
  const [showDropDown, setshowDropDown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  // if(session) {
  //   console.log(session.user)
  //   console.log(session.user.name)    
  // }

  return (
    <nav className='relative'>
      <header className="bg-white  dark:bg-[#3b2f30] shadow-lg relative">
        <nav className="container mx-auto px-8 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
              <Coffeemug />
            <Link href="/" className="text-xl text-center font-bold text-indigo-800 dark:text-white transition-colors duration-300">Get Me a Chai
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 text-2xl font-medium">
            <Link href="/" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Home</Link>
            <Link href="/about" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">About</Link>
            <Link href="/services" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Services</Link>
            <Link href="/contact" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Contact</Link>
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
                    <Link onClick={() => setshowDropDown(false)} href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                  </li>
                  <li>
                    <Link onClick={() => setshowDropDown(false)} href="/earnings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                  </li>
                  <li>
                    <button onClick={() => { signOut() }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</button>
                  </li>
                </ul>
              </div>



            </>
            }
            {/* {session && <Link href={"/Logout"}>
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Sign Out</button>
            </Link>} */}
            {!session && <Link href={"/Login"}>
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Login</button>
            </Link>}

          </div>
          <button 
          id="mobileMenuButton" 
          onClick={()=> setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white focus:outline-none transition-colors duration-300 z-50 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </nav>
        
        {/* Mobile Menu Backdrop */}
        {showMobileMenu && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setShowMobileMenu(false)}
          ></div>
        )}

        {/* Mobile Menu Drawer */}
        <div 
          id="mobileMenu" 
          className={`fixed top-0 right-0 h-full w-64 px-2 bg-white dark:bg-[#3b2f30] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            showMobileMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
             <h2 className="text-xl font-bold text-indigo-800 dark:text-white">Menu</h2>
             <button onClick={() => setShowMobileMenu(false)} className="text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
          </div>
          <div className="flex flex-col  p-4 space-y-4">
            <Link href="/" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Home</Link>
            <Link href="/about" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">About</Link>
            <Link href="/services" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Services</Link>
            <Link href="/contact" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Contact</Link>
            
            {session ? (
              <>
                 <Link href="/dashboard" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Dashboard</Link>
                 <Link href={`/${session.user.name}`} onClick={() => setShowMobileMenu(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Your Page</Link>
                 <Link href="/earnings" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Earnings</Link>
                 <button onClick={() => { signOut(); setShowMobileMenu(false); }} className="block w-full text-left text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/Login" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Login</Link>
                <Link href="/Login" onClick={() => setShowMobileMenu(false)} className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 text-center">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>
    </nav>
  )
}

export default Navbar
