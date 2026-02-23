"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Coffeemug from "./Coffeemug";
import { getFeaturedUsers } from "../action/useractions";

const HeroSection = () => {
  const [featuredUsers, setFeaturedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getFeaturedUsers();
        setFeaturedUsers(users);
      } catch (error) {
        console.error("Failed to fetch featured users:", error);
      }
    };
    fetchUsers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative isolate overflow-hidden bg-neutral-950 min-h-screen flex flex-col justify-center">
      {/* Background Gradients & Blobs */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#fbbf24] to-[#d97706] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-0 sm:pb-32 lg:flex lg:px-8 lg:py-10 lg:pb-30 items-center gap-12">
        
        {/* Left Column: Text Content */}
        <motion.div 
          className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mt-24 sm:mt-32 lg:mt-16">
            <span className="inline-flex items-center space-x-2 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
              <span className="text-amber-200">New Feature</span>
              <span className="h-4 w-px bg-amber-500/20"></span>
              <span>Creator Payments Live</span>
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Fund your creative journey with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">Chai</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-neutral-300">
            A crowdfunding platform designed for creators, developers, and artists. Get support from your fans and followers one cup of chai at a time. Start building your community today.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-10 flex items-center gap-x-6">
            <Link
              href="/Login"
              className="rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:from-amber-400 hover:to-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 transition-all duration-300 transform hover:scale-105"
            >
              Start My Page
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-white hover:text-amber-300 transition-colors flex items-center gap-1 group"
            >
              Read more <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </Link>
          </motion.div>

          {/* Social Proof / Stats (Optional, could be static for now) */}
          <motion.div variants={itemVariants} className="mt-10 border-t border-white/10 pt-8">
            <p className="text-neutral-400 text-sm font-medium mb-4">Trusted by creators worldwide</p>
            <div className="flex -space-x-2 overflow-hidden items-center">
               {featuredUsers.slice(0, 3).map((user, i) => (
                  <img
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-neutral-900 object-cover"
                    src={user.profilepic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                    alt={user.username}
                  />
               ))}
               {featuredUsers.length > 3 && (
                 <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 ring-2 ring-neutral-900 text-xs font-medium text-neutral-400">
                   +{featuredUsers.length - 3}
                 </span>
               )}
               {featuredUsers.length === 0 && (
                 <span className="text-neutral-500 text-xs italic">Be the first to join!</span>
               )}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Visuals */}
        <motion.div 
            className="mt-12 sm:mt-24 lg:mt-0 lg:w-[50%] hidden lg:flex justify-center lg:justify-end relative z-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <div className="relative w-full  h-[400px] sm:w-[350px] sm:h-[450px] lg:w-[350px] lg:h-[500px] flex-shrink-0">
                  {/* Card Container simulating a profile or interaction */}
                  <div className="relative h-full w-full rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-amber-500/10 shadow-2xl p-6 flex flex-col items-center justify-between overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
                    
                    {/* Decorative Elements inside card */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/30 transition-all duration-500"></div>
                    
                    <div className="z-10 mt-8 sm:mt-12 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] duration-300">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                       <Coffeemug loop={true} />
                      </div>
                    </div>
                    
                    <div className="z-10 text-center mt-4 sm:mt-8 w-full">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-serif">Buy me a Chai</h3>
                        <p className="text-neutral-400 text-xs sm:text-sm px-2">Support your favorite creators.</p>
                    </div>

                    {/* Supporters Stack */}
                    <div className="w-full mt-auto mb-4 z-10 flex flex-col gap-3">
                      <motion.div 
                          className="bg-neutral-800/50 p-2 sm:p-3 rounded-lg border border-white/5 flex items-center gap-3 backdrop-blur-sm"
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                      >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-[10px] sm:text-xs shadow-lg shadow-amber-500/20">₹</div>
                          <div className="flex-1">
                            <div className="h-2 w-16 sm:w-20 bg-neutral-700/50 rounded-full mb-1"></div>
                            <div className="h-1.5 w-10 sm:w-12 bg-neutral-700/30 rounded-full"></div>
                          </div>
                      </motion.div>
                    </div>
                  </div>
            </div>
        </motion.div>
      </div>
      
      {/* Bottom Gradient Blob */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#fbbf24] to-[#d97706] opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

       {/* Featured Users Marquee (Mobile/Desktop friendly) */}
       {featuredUsers.length > 0 && (
        <div className="w-full bg-neutral-900/50 backdrop-blur-sm py-4 border-t border-white/5 absolute bottom-0">
             <div className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-amber-500/50 mb-2">
                Recently Featured
             </div>
             <div className="flex flex-wrap justify-center gap-6 px-4">
                {featuredUsers.map((user, idx) => (
                    <Link href={`/${user.username}`} key={idx} className="group flex items-center gap-2 transition-all hover:scale-105">
                        <img src={user.profilepic || "/avatar.png"} alt={user.username} className="w-6 h-6 rounded-full object-cover ring-2 ring-neutral-800 group-hover:ring-amber-500 text-xs" />
                        <span className="text-neutral-400 text-sm font-medium group-hover:text-amber-200 transition-colors">{user.name}</span>
                    </Link>
                ))}
            </div>
        </div>
       )}
    </div>
  );
};

export default HeroSection;
