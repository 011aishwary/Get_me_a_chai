'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={itemVariants} className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#f2f2ef] mb-4">
            About <span className="text-indigo-600">Get Me a Chai</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Empowering creators to fuel their passion through the support of their community. We believe in the power of small contributions making a big impact.
          </p>
        </motion.section>

        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-[#5c4a4a] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-[#806354]">
                <h2 className="text-2xl font-bold mb-4 text-[#f2f2ef]">Our Mission</h2>
                <p className="text-gray-300">
                    To provide a seamless and transparent platform for creators to receive support from their fans. Whether you're a developer, artist, writer, or musician, Get Me a Chai is here to help you sustain your creative journey.
                </p>
            </div>
            <div className="bg-[#5c4a4a] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-[#806354]">
                <h2 className="text-2xl font-bold mb-4 text-[#f2f2ef]">Why Choose Us?</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Direct support from fans</li>
                    <li>Zero platform fees for early adopters</li>
                    <li>Secure and fast payouts</li>
                    <li>Community-focused features</li>
                </ul>
            </div>
        </motion.div>

        <motion.section variants={itemVariants} className="bg-[#3b2f30] rounded-3xl p-10 mt-12 text-center shadow-inner">
          <h2 className="text-3xl font-bold mb-6 text-[#f2f2ef]">Join the Community</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Become a part of a growing ecosystem of creators and supporters. Your next big project starts with a cup of chai.
          </p>
          <div className="flex justify-center gap-4">
             <div className="w-16 h-16 bg-[#806354] rounded-full flex items-center justify-center text-2xl animate-bounce">☕</div>
             <div className="w-16 h-16 bg-[#806354] rounded-full flex items-center justify-center text-2xl animate-bounce delay-100">🚀</div>
             <div className="w-16 h-16 bg-[#806354] rounded-full flex items-center justify-center text-2xl animate-bounce delay-200">💎</div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default AboutPage;
