"use client"
import React from 'react'
import { motion } from 'framer-motion'

const LoadingAnimation = () => {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center gap-4 fixed inset-0 z-50">
            <div className="relative flex flex-col items-center">
                {/* Steam animation */}
                <div className="flex gap-2 mb-2">
                    <motion.div 
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: -20 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0 }}
                        className="w-1 h-4 bg-white/50 rounded-full blur-[1px]"
                    />
                    <motion.div 
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: -20 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
                        className="w-1 h-6 bg-white/50 rounded-full blur-[1px]"
                    />
                    <motion.div 
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: -20 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }}
                        className="w-1 h-4 bg-white/50 rounded-full blur-[1px]"
                    />
                </div>

                {/* Cup Body */}
                <div className="relative">
                    <div className="w-16 h-12 bg-amber-600 rounded-b-2xl relative z-10 border-2 border-amber-400">
                        {/* Tea liquid surface */}
                        <div className="absolute top-0 w-full h-full bg-amber-500 rounded-b-xl opacity-80 overflow-hidden">
                             <motion.div 
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="w-full h-full bg-amber-400/20"
                             />
                        </div>
                    </div>
                    {/* Handle */}
                    <div className="absolute top-2 right-[-12px] w-6 h-8 border-4 border-amber-600 rounded-r-xl z-0"></div>
                </div>
            </div>
            
            <motion.h2
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-amber-500 font-bold text-xl tracking-widest mt-4"
            >
                BREWING...
            </motion.h2>
        </div>
    )
}

export default LoadingAnimation
