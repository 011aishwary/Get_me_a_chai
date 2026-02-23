"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { searchUsers, fetchUser } from '../action/useractions';

import Coffeemug from './Coffeemug'
import Link from 'next/link'
// import Dashboard from '@/app/dashboard/page'


const Navbar = () => {
  const { data: session } = useSession()
  const [showDropDown, setshowDropDown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()
  const searchRef = useRef(null)

  useEffect(() => {
    const getUserData = async () => {
      if (session && session.user && session.user.name) {
        let u = await fetchUser(session.user.name);
        let userObj = Array.isArray(u) ? (u[0] || {}) : (u || {});
        setCurrentUser(userObj);
      }
    };
    getUserData();
  }, [session]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        const results = await searchUsers(searchQuery);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // if(session) {
  //   console.log(session.user)
  //   console.log(session.user.name)    
  // }

  return (
    <nav className='relative w-full'>
      <header className="bg-white dark:bg-[#3b2f30] shadow-lg relative w-full">
        <nav className="w-full px-4 sm:px-8 py-2 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-2">
              <Coffeemug loop={false} />
            <Link href="/" className="text-xl text-center font-bold text-indigo-800 dark:text-white transition-colors duration-300">Get Me a Chai
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 text-xl font-medium">
            <Link href="/" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Home</Link>
            <Link href="/about" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">About</Link>
            <Link href="/services" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Services</Link>
            <Link href="/contact" className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">Contact</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Search Bar */}
            <div className="relative" ref={searchRef}>
              {/* Desktop Search (lg and up) */}
              <div className="hidden lg:block  relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { if (searchQuery.trim().length > 0) setShowSuggestions(true) }}
                  className="bg-gray-950 text-[#f0f0f0] text-sm rounded-lg focus:ring-amber-950 focus:border-amber-950 block w-48 pl-10 p-2.5"
                />
              </div>

              {/* Tablet Search Icon (md to lg) */}
              <div className="lg:hidden">
                <button 
                  onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                  className="p-2.5 bg-gray-900 rounded-full hover:bg-gray-800  transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </button>

                {/* Tablet Search Dropdown */}
                {showSearchDropdown && (
                  <div className="absolute top-12 right-0 z-50   p-3 w-64 ">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                      </div>
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => { if (searchQuery.trim().length > 0) setShowSuggestions(true) }}
                        className="bg-gray-950 text-[#f0f0f0] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions Dropdown (Shared) */}
              {showSuggestions && suggestions.length > 0 && (
                <div className={`absolute top-12 ${showSearchDropdown ? 'right-0 mt-14' : 'left-0'} z-50 bg-gray-950 divide-y divide-gray-100 rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto`}>
                  <ul className="py-2 text-sm text-gray-950">
                    {suggestions.map((user) => (
                      <li key={user._id}>
                        <button
                          onClick={() => {
                            setShowSuggestions(false);
                            setShowSearchDropdown(false);
                            setSearchQuery("");
                            router.push(`/${user.username}`);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-gray-900 rounded-2xl  text-[#f0f0f0] hover:text-white text-left"
                        >
                          {user.profilepic ? (
                            <img src={user.profilepic} alt={user.username} className="w-8 h-8 rounded-full mr-3 object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-500 mr-3 flex items-center justify-center">
                              <span className="text-xs font-bold">{user.username.charAt(0).toUpperCase()}</span>
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-semibold">{user.name || user.username}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {showSuggestions && searchQuery.trim().length > 0 && suggestions.length === 0 && (
                <div className={`absolute top-12 ${showSearchDropdown ? 'right-0 mt-14' : 'left-0'} z-50 bg-gray-950 rounded-lg shadow-lg w-64 p-4 text-center text-sm text-gray-500 dark:text-gray-400`}>
                  No users found
                </div>
              )}
            </div>

            {session && <>
              {/* dropdown content */}

              <button onClick={() => { setshowDropDown(!showDropDown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="mx-3 relative focus:outline-none font-medium rounded-full text-sm text-center inline-flex items-center transition-transform hover:scale-105" type="button">
                {currentUser?.profilepic || session?.user?.image ? (
                  <img 
                    src={currentUser?.profilepic || session?.user?.image} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 dark:border-indigo-400"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-indigo-500 dark:border-indigo-400">
                    {(session.user.name && session.user.name.charAt(0).toUpperCase()) || "U"}
                  </div>
                )}
                <svg className="w-2.5 h-2.5 ms-2 text-gray-950 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
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


              <div id="dropdown" className={`z-20 ${showDropDown ? "" : "hidden"}  absolute top-16 ml-3 divide-y divide-gray-100 rounded-lg shadow-sm w-44 bg-gray-950`}>
                <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <Link onClick={() => setshowDropDown(false)} href="/dashboard" className="block px-4 py-2 hover:bg-gray-900 hover:text-white" >
                      Dashboard</Link>
                  </li>
                  <li>
                    <Link onClick={() => setshowDropDown(false)} href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-900 hover:text-white">Your Page</Link>
                  </li>
                  
                  <li>
                    <button onClick={() => { signOut() }} className="block w-full text-left px-4 py-2 hover:bg-gray-900 hover:text-white">Sign out</button>
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
            {/* Mobile Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if (searchQuery.trim().length > 0) setShowSuggestions(true) }}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-12 left-0 z-50 bg-white dark:bg-gray-700 divide-y divide-gray-100 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {suggestions.map((user) => (
                      <li key={user._id}>
                        <button
                          onClick={() => {
                            setShowSuggestions(false);
                            setSearchQuery("");
                            setShowMobileMenu(false);
                            router.push(`/${user.username}`);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                        >
                          {user.profilepic ? (
                            <img src={user.profilepic} alt={user.username} className="w-8 h-8 rounded-full mr-3 object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-500 mr-3 flex items-center justify-center">
                              <span className="text-xs font-bold">{user.username.charAt(0).toUpperCase()}</span>
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-semibold">{user.name || user.username}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {showSuggestions && searchQuery.trim().length > 0 && suggestions.length === 0 && (
                <div className="absolute top-12 left-0 z-50 bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              )}
            </div>

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
