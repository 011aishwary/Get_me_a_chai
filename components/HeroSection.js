"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Coffeemug from './Coffeemug';
import { getFeaturedUsers } from '../action/useractions';

const HeroSection = () => {
    const [featuredUsers, setFeaturedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getFeaturedUsers();
            setFeaturedUsers(users);
        };
        fetchUsers();
    }, []);

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
            {/* Background glowing orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 max-md:hidden left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
            ></motion.div>
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/3 max-md:hidden right-1/4 w-72 h-72 bg-purple-600/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
            ></motion.div>

            {/* Floating Elements Left */}
            <div className="absolute left-10 top-1/4 hidden lg:flex flex-col gap-12 opacity-60 pointer-events-none">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl"
                >
                    <span className="text-3xl">☕</span>
                    <div className="h-2 w-12 bg-indigo-400/50 rounded mt-2"></div>
                    <div className="h-2 w-8 bg-indigo-400/30 rounded mt-1"></div>
                </motion.div>
                <motion.div
                    animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl ml-12"
                >
                    <span className="text-3xl">🏠</span>
                    <div className="h-2 w-16 bg-pink-400/50 rounded mt-2"></div>
                    <div className="h-2 w-10 bg-pink-400/30 rounded mt-1"></div>
                </motion.div>
            </div>

            {/* Floating Elements Right */}
            <div className="absolute right-10 top-1/3 hidden lg:flex flex-col gap-12 opacity-60 pointer-events-none">
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl mr-8"
                >
                    <span className="text-3xl">🏥</span>
                    <div className="h-2 w-14 bg-purple-400/50 rounded mt-2"></div>
                    <div className="h-2 w-10 bg-purple-400/30 rounded mt-1"></div>
                </motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl"
                >
                    <span className="text-3xl">💡</span>
                    <div className="h-2 w-12 bg-yellow-400/50 rounded mt-2"></div>
                    <div className="h-2 w-16 bg-yellow-400/30 rounded mt-1"></div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center px-4"
            >
                <div className="flex lg:flex-row flex-col items-center justify-center mb-6">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Coffeemug />
                    </motion.div>
                    <motion.h1
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold text-[#f2f2ef] tracking-tight ml-4"
                    >
                        Get Me a Chai
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    A crowdfunding platform for creators. Get funded by your fans and followers.
                    <span className="block mt-2 text-indigo-400 font-semibold type-writer">Start your creative journey now!</span>
                </motion.p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
                    <Link href="/Login">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(99 102 241)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg border border-indigo-500 transition-all"
                        >
                            Start Here
                        </motion.button>
                    </Link>
                    <Link href="/about">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#4a3c3d" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-transparent border-2 border-[#f2f2ef] text-[#f2f2ef] font-bold py-4 px-8 rounded-full text-lg hover:border-indigo-400 transition-all"
                        >
                            Read More
                        </motion.button>
                    </Link>
                </div>

                {/* Featured Users Section */}
                {featuredUsers.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="mt-8"
                    >
                        <p className="text-sm text-gray-700 mb-4 uppercase tracking-widest font-semibold">Support these creators</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {featuredUsers.map((user, index) => (
                                <Link href={`/${user.username}`} key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + index * 0.1, duration: 0.5, type: "spring" }}
                                        whileHover={{ y: -5, scale: 1.05, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.3)" }}
                                        className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 cursor-pointer transition-all"
                                    >
                                        {user.profilepic ? (
                                            <img src={user.profilepic} alt={user.username} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center border-2 border-indigo-400">
                                                <span className="text-white font-bold">{user.username.charAt(0).toUpperCase()}</span>
                                            </div>
                                        )}
                                        <div className="flex flex-col items-start">
                                            <span className="text-white font-medium text-sm">{user.name || user.username}</span>
                                            <span className="text-indigo-300 text-xs">@{user.username}</span>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default HeroSection;
