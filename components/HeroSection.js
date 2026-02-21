"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Coffeemug from './Coffeemug';

const HeroSection = () => {
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

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
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
            </motion.div>
        </section>
    );
};

export default HeroSection;
