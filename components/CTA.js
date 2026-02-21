"use client";
import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const CTA = () => {
    // Parallax effect for content inside CTA
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="relative py-32 flex flex-col items-center justify-center overflow-hidden w-full">
        {/* Animated fluid background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/20 via-purple-700/30 to-indigo-700/20 animate-gradient-x w-full h-full opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-30 w-full h-full"></div>

      <motion.div 
        style={{ y }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="z-10 text-center container px-6 relative"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#f2f2ef] mb-8 tracking-tight drop-shadow-xl">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Join thousands of creators who are already getting funded. It&apos;s free, it&apos;s easy, and it&apos;s built for you.
        </p>
        
        <Link href="/Login">
          <motion.button 
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-700 text-lg md:text-xl font-bold py-4 px-12 rounded-full shadow-2xl transition-all duration-300 hover:bg-gray-100 ring-4 ring-white/50"
          >
             Launch Your Page
          </motion.button>
        </Link>
        
        <div className="mt-8 text-sm text-gray-300 opacity-80 animate-pulse">
            No credit card required • Free during beta
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
