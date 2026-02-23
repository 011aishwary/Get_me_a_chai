"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Script from 'next/script'
import { initiate, fetchUser, fetchPayments } from '../action/useractions'
import { useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const Paymentpage = ({ username }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [form, setform] = useState({ name: "", message: "", amount: "" })
    const [currentuser, setCurrentuser] = useState({})
    const [payments, setpayments] = useState([])
    const [loading, setLoading] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        if (searchParams.get('paymentdone') === "true") {
            toast.success('Payment Successful!', {
                position: "bottom-right",
                autoClose: 5000,
                theme: "dark",
                transition: Bounce,
            });
            // router.push(/\)
        }
    }, [router, searchParams, username])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const getpayments = useCallback(async () => {
        setLoading(true);
        let u = await fetchUser(username);
        let userObj = Array.isArray(u) ? (u[0] || {}) : (u || {});
        setCurrentuser(userObj);
        let p = await fetchPayments(username);
        setpayments(p);
        setLoading(false);
    }, [username]);

    useEffect(() => {
        getpayments()
    }, [getpayments])

    const pay = async (amount) => {
        let a = await initiate(amount, username, form)
        let orderid = a.id
        var options = {
            "key": currentuser.razorpayId,
            "amount": amount,
            "currency": "INR",
            "name": "Get me a Chai",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderid,
            "callback_url": `${window.location.origin}/api/razorpay`,
            "prefill": { "name": "", "email": "", "contact": "" },
            "notes": { "address": "Get me a Chai Corporate Office" },
            "theme": { "color": "#3399cc" }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open()
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="min-h-screen text-white pb-10"
        >
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            {/* Cover Image & Profile Section */}
            <div className="relative w-full">
                <div className="w-full h-[35vh] md:h-[50vh] relative overflow-hidden">
                    {loading ? (
                         <div className="w-full h-full bg-gray-800 animate-pulse"></div>
                    ) : ( 
                        <Image 
                            className='object-cover w-full h-full' 
                            fill
                            src={currentuser.coverpic ? currentuser.coverpic : '/avatar.png'} 
                            alt="Cover Image"
                            priority
                            unoptimized={true} // Add this if you face external loader issues
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                </div>
                
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#3b2f30] overflow-hidden shadow-2xl bg-black"
                    >
                        {loading ? (
                           <div className="w-full h-full bg-gray-700 animate-pulse"></div>
                        ) : (
                        <Image 
                            className='object-cover'
                            fill
                            src={currentuser.profilepic ? currentuser.profilepic : '/avatar.png'} 
                            alt="Profile"
                            unoptimized={true}
                        />
                        )}
                    </motion.div>
                </div>
            </div>

            {/* User Info */}
            <div className="text-center mt-20 mb-10 px-4">
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className='text-3xl text-amber-950 text-center md:text-4xl font-bold mb-2'
                >
                    @{decodeURIComponent(username).replace(/\s+/g, " ")}
                </motion.h1>
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-800 text-sm md:text-base mb-2"
                >
                    Raising funds for {decodeURIComponent(username).replace(/\s+/g, " ")}
                </motion.p>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-amber-900 font-semibold"
                >
                    {payments.length} Supporters • ₹{payments.reduce((acc, curr) => acc + curr.amount, 0)} raised
                </motion.div>

                {/* About / Story Section */}
                {currentuser.about && (
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                        className="max-w-3xl mx-auto mt-10 mb-12"
                    >
                        <div className="p-8 sm:p-10 bg-[#2a2223]/60 backdrop-blur-md rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group transition-all duration-500 hover:bg-[#2a2223]/80 hover:border-white/10 hover:shadow-2xl">
                            
                            {/* Subtle top highlight */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="flex  items-center gap-4 mb-8">
                                <motion.div 
                                    whileHover={{ rotate: 5, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="p-3 bg-amber-900/20 rounded-full border border-amber-900/30 text-amber-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </motion.div>
                                {/* <div className="w-[2px] h-8 bg-amber-900/50"></div> */}
                                <h2 className="text-xl sm:text-xl font-semibold text-gray-200 tracking-wide">
                                    Purpose & Story
                                </h2>
                            </div>
                            
                            <div className="relative px-4 sm:px-8">
                                {/* Minimalist quote marks */}
                                <span className="absolute -top-4 -left-2 text-4xl text-gray-600/30 font-serif leading-none">"</span>
                                <div className="relative z-10">
                                    <p className="text-gray-300 whitespace-pre-wrap text-start leading-relaxed text-base sm:text-lg font-light">
                                        {isExpanded || currentuser.about.length <= 300 
                                            ? currentuser.about 
                                            : `${currentuser.about.slice(0, 300)}...`}
                                    </p>
                                    {currentuser.about.length > 300 && (
                                        <button 
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="text-amber-600 hover:text-amber-500 text-sm font-medium mt-4 block transition-colors"
                                        >
                                            {isExpanded ? "Read less" : "Read more"}
                                        </button>
                                    )}
                                </div>
                                <span className="absolute -bottom-8 -right-2 text-4xl text-gray-600/30 font-serif leading-none rotate-180">"</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                
            </div>

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
                
               

                {/* Date/Payment Form */}
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#3b2f30]/90 backdrop-blur-md border border-white/10 rounded-xl p-5 h-fit  top-24"
                >
                    <h2 className="text-lg font-bold mb-4 border-b border-gray-700 text-[#f0f0f0] pb-2">Support {decodeURIComponent(username).replace(/\s+/g, " ")}</h2>
                    <form className="space-y-3">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#f0f0f0] mb-1">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={form.name} 
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-gray-600 rounded-lg p-3 text-[#f0f0f0] focus:ring-2 focus:ring-amber-950 focus:border-transparent outline-none transition-all placeholder-gray-600" 
                                placeholder="Enter your name" 
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-[#f0f0f0] mb-1">Message</label>
                            <textarea 
                                name="message" 
                                value={form.message} 
                                onChange={handleChange}
                                rows="3"
                                className="w-full bg-black/20 border border-gray-600 rounded-lg p-3 text-[#f0f0f0] focus:ring-1 focus:ring-amber-950 focus:border-transparent outline-none transition-all placeholder-gray-600 resize-none" 
                                placeholder="Say something nice..." 
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-[#f0f0f0] mb-1">Amount (₹)</label>
                            <input 
                                type="number" 
                                name="amount" 
                                value={form.amount} 
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-gray-600 rounded-lg p-3 text-[#f0f0f0] focus:ring-1 focus:ring-amber-950 focus:border-transparent outline-none transition-all placeholder-gray-600" 
                                placeholder="Amount" 
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            {[10, 20, 50].map((amt) => (
                                <motion.button
                                    key={amt}
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setform({ ...form, amount: amt })} 
                                    className="flex-1 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 rounded-lg text-indigo-300 font-medium transition-colors"
                                >
                                    ₹{amt}
                                </motion.button>
                            ))}
                        </div>

                        <motion.button 
                            type="button"
                            onClick={() => pay((form.amount) * 100)} 
                            disabled={!form.amount || form.name.length < 3 || form.message.length < 3}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Pay ₹{form.amount || '0'}
                        </motion.button>
                    </form>
                </motion.div>

                 {/* Supporters List */}
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#3b2f30]/90 backdrop-blur-md border border-white/10 rounded-xl p-5 max-md:h-fit max-h-[400px] sticky flex flex-col"
                >
                    <h2 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 bg-transparent text-[#f0f0f0] sticky top-0">Top Supporters</h2>
                    <ul className="overflow-y-auto flex-1 space-y-3 pr-2 custom-scrollbar">
                        {payments.length === 0 ? (
                            <li className='text-center text-gray-900 mt-8 italic text-md'>No supporters yet. Be the first! 🚀</li>
                        ) : (
                            payments.map((p, index) => (
                                <motion.li 
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-3 p-2.5 bg-black/20 rounded-lg hover:bg-black/40 transition-colors"
                                >
                                    <div className="shrink-0 p-1 bg-indigo-500/20 rounded-full">
                                        <Image width={30} height={30} src="/avatar.png" alt="supporter" className="rounded-full" />
                                    </div>
                                    <div className="flex-1 min-w-0 text-[#f0f0f0]">
                                        <p className="text-sm font-light truncate hover:text-indigo-400 transition-colors">
                                            {p.name} <span className="text-gray-400 text-xs font-light">donated</span> <span className="text-green-400 font-bold">₹{p.amount}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 break-words mt-1 leading-tight">"{p.message}"</p>
                                    </div>
                                </motion.li>
                            ))
                        )}
                    </ul>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Paymentpage
