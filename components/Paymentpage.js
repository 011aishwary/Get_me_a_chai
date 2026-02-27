"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Script from 'next/script'
import { initiate, fetchUser, fetchPayments } from '../action/useractions'
import { useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {User2} from 'lucide-react'

const Paymentpage = ({ username }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [form, setform] = useState({ name: "", message: "", amount: "" })
    const [currentuser, setCurrentuser] = useState({})
    const [payments, setpayments] = useState([])
    const [loading, setLoading] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false)
    const [paymentLoading, setPaymentLoading] = useState(false)

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
        setPaymentLoading(true);
        try {
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
                "theme": { "color": "#3399cc" },
                "modal": {
                    "ondismiss": function() {
                        setPaymentLoading(false);
                    }
                }
            }
            var rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', function (response){
                setPaymentLoading(false);
            });
            rzp1.open()
        } catch (error) {
            console.error("Payment initiation failed:", error);
            setPaymentLoading(false);
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-neutral-950 text-white pb-10"
        >
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            {/* Cover Image & Profile Section */}
            <div className="relative w-full">
                <div className="w-full h-[35vh] md:h-[50vh] relative overflow-hidden">
                    {loading ? (
                         <div className="w-full h-full bg-neutral-900 animate-pulse"></div>
                    ) : ( 
                        <Image 
                            className='object-cover w-full h-full' 
                            fill
                            src={currentuser.coverpic ? currentuser.coverpic : '/PatreonCoverImage.jpg'} 
                            alt="Cover Image"
                            priority
                            unoptimized={true} // Add this if you face external loader issues
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-neutral-950"></div>
                </div>
                
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-neutral-900 overflow-hidden shadow-2xl bg-neutral-800"
                    >
                        {loading ? (
                           <div className="w-full h-full bg-neutral-800 animate-pulse"></div>
                        ) : (
                        <Image 
                            className='object-cover'
                            fill
                            src={currentuser.profilepic ? currentuser.profilepic : '/cat.jpg'} 
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
                    className='text-3xl text-white text-center md:text-4xl font-bold mb-2'
                >
                    @{decodeURIComponent(username).replace(/\s+/g, " ")}
                </motion.h1>
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-neutral-400 text-sm md:text-base mb-2"
                >
                    Raising funds for {decodeURIComponent(username).replace(/\s+/g, " ")}
                </motion.p>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-amber-500 font-semibold"
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
                        <div className="p-8 sm:p-10 bg-neutral-900/60 backdrop-blur-md rounded-2xl border border-neutral-800 shadow-xl relative overflow-hidden group transition-all duration-500 hover:bg-neutral-900/80 hover:border-amber-500/20 hover:shadow-2xl">
                            
                            {/* Subtle top highlight */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="flex  items-center gap-4 mb-8">
                                <motion.div 
                                    whileHover={{ rotate: 5, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="p-3 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </motion.div>
                                {/* <div className="w-[2px] h-8 bg-amber-900/50"></div> */}
                                <h2 className="text-xl sm:text-xl font-semibold text-neutral-200 tracking-wide">
                                    Purpose & Story
                                </h2>
                            </div>
                            
                            <div className="relative px-4 sm:px-8">
                                {/* Minimalist quote marks */}
                                <span className="absolute -top-4 -left-2 text-4xl text-neutral-700 font-serif leading-none">"</span>
                                <div className="relative z-10">
                                    <p className="text-neutral-300 whitespace-pre-wrap text-start leading-relaxed text-base sm:text-lg font-light">
                                        {isExpanded || currentuser.about.length <= 300 
                                            ? currentuser.about 
                                            : `${currentuser.about.slice(0, 300)}...`}
                                    </p>
                                    {currentuser.about.length > 300 && (
                                        <button 
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="text-amber-500 hover:text-amber-400 text-sm font-medium mt-4 block transition-colors"
                                        >
                                            {isExpanded ? "Read less" : "Read more"}
                                        </button>
                                    )}
                                </div>
                                <span className="absolute -bottom-8 -right-2 text-4xl text-neutral-700 font-serif leading-none rotate-180">"</span>
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
                    className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-xl p-5 h-fit top-24"
                >
                    <h2 className="text-lg font-bold mb-4 border-b border-neutral-800 text-neutral-200 pb-2">Support {decodeURIComponent(username).replace(/\s+/g, " ")}</h2>
                    <form className="space-y-3">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={form.name} 
                                onChange={handleChange}
                                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder-neutral-600" 
                                placeholder="Enter your name" 
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Message</label>
                            <textarea 
                                name="message" 
                                value={form.message} 
                                onChange={handleChange}
                                rows="3"
                                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder-neutral-600 resize-none" 
                                placeholder="Say something nice..." 
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-neutral-300 mb-1">Amount (₹)</label>
                            <input 
                                type="number" 
                                name="amount" 
                                value={form.amount} 
                                onChange={handleChange}
                                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder-neutral-600" 
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
                                    className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-amber-500 font-medium transition-colors"
                                >
                                    ₹{amt}
                                </motion.button>
                            ))}
                        </div>

                        <motion.button 
                            type="button"
                            onClick={() => pay((form.amount) * 100)} 
                            disabled={!form.amount || form.name.length < 3 || form.message.length < 3 || paymentLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-3.5 mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center relative overflow-hidden`}
                        >
                            {paymentLoading ? (
                                <>
                                    <motion.div 
                                        className="absolute inset-0 bg-white/20"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    />
                                    <svg aria-hidden="true" role="status" className="inline w-6 h-6 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                </>
                            ) : (
                                `Pay ₹${form.amount || '0'}`
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                 {/* Supporters List */}
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-xl p-5 max-md:h-fit max-h-[400px] sticky flex flex-col"
                >
                    <h2 className="text-lg font-bold mb-4 border-b border-neutral-800 pb-2 bg-transparent text-neutral-200 sticky top-0">Top Supporters</h2>
                    <ul className="overflow-y-auto flex-1 space-y-3 pr-2 custom-scrollbar">
                        {payments.length === 0 ? (
                            <li className='text-center text-neutral-500 mt-8 italic text-md'>No supporters yet. Be the first! 🚀</li>
                        ) : (
                            payments.map((p, index) => (
                                <motion.li 
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-3 p-2.5 bg-neutral-950/50 rounded-lg hover:bg-neutral-800 transition-colors"
                                >
                                    <div className="shrink-0 p-1 bg-neutral-800 rounded-full">
                                        <User2 className="text-amber-500" size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0 text-neutral-200">
                                        <p className="text-sm font-light truncate hover:text-amber-500 transition-colors">
                                            {p.name} <span className="text-neutral-500 text-xs font-light">donated</span> <span className="text-green-500 font-bold">₹{p.amount}</span>
                                        </p>
                                        <p className="text-xs text-neutral-400 break-words mt-1 leading-tight">"{p.message}"</p>
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
