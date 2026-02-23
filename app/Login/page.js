"use client"
import React, { useEffect } from 'react';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Coffeemug from '../../components/Coffeemug';

const Login = () => {
    const { data: session } = useSession()
    const router = useRouter()
    
    useEffect(() => {
      if(session) {
        router.push('/dashboard')
      }
    }, [session, router])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-amber-950 to-amber-900 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden p-8"
            >
                <div className="text-center mb-8">
                    
                         <div className="w-full h-full flex items-center justify-center lg:hover:rotate-15 lg:hover:scale-130 lg:hover:-translate-y-4 lg:hover:translate-x-3 transition-all ease-in-out duration-500 scale-120"><Coffeemug loop={false}/></div>
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-white mb-2"
                    >
                        Welcome Back
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300"
                    >
                        Login to support your favorite creators
                    </motion.p>
                </div>

                <div className="flex flex-col gap-4">
                    <motion.button 
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 1)" }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={()=>{signIn("github")}}
                        className="group flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300"
                    >
                        <Image
                            src="https://www.svgrepo.com/show/512317/github-142.svg" 
                            width={24} 
                            height={24} 
                            alt="GitHub"
                            className="w-6 h-6 transition-transform group-hover:rotate-12" 
                        />
                        <span>Continue with GitHub</span>
                    </motion.button>

                    <motion.button 
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 1)" }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onClick={()=>{signIn("google")}}
                        className="group flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300"
                    >
                        <Image
                            src="https://www.svgrepo.com/show/475656/google-color.svg" 
                            width={24} 
                            height={24} 
                            alt="Google"
                            className="w-6 h-6 transition-transform group-hover:rotate-12"
                        />
                        <span>Continue with Google</span>
                    </motion.button>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center text-sm text-gray-400"
                >
                    By logging in, you agree to our terms & conditions
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Login
