"use client";
import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const CTA = () => {
    // Parallax effect for content inside CTA
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="relative py-32 flex flex-col items-center justify-center overflow-hidden w-full bg-neutral-900">
        {/* Animated fluid background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 via-orange-900/40 to-amber-900/40 animate-gradient-x w-full h-full opacity-90"></div>
        <div className="absolute inset-0 bg-black/50 w-full h-full backdrop-blur-sm"></div>

      <motion.div 
        style={{ y }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="z-10 text-center container px-6 relative"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight drop-shadow-xl">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Join thousands of creators who are already getting funded. It&apos;s free, it&apos;s easy, and it&apos;s built for you.
        </p>
        
        <Link href="/Login">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg md:text-xl font-bold py-4 px-12 rounded-full shadow-2xl transition-all duration-300 ring-2 ring-white/10 hover:ring-amber-400"
          >
             Launch Your Page
          </motion.button>
        </Link>
        
        <div className="mt-8 text-sm text-neutral-400 opacity-80 animate-pulse">
            No credit card required • Free during beta
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
