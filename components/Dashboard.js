"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { uploadImage } from '../app/actions';
import { useRouter } from 'next/navigation';
import { fetchUser, updateUser } from '../action/useractions';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { set } from 'mongoose';
import { motion } from 'framer-motion';

const Dashform = () => {
    const { data: session, update } = useSession()
    const [form, setform] = useState({})
    const [loading, setLoading] = useState(false)
    const [publicId, setPublicId] = useState(null);
    const [initialized, setInitialized] = useState(false)
    const [profilePicName, setProfilePicName] = useState("");
    const [coverPicName, setCoverPicName] = useState("");
    const [showRazorpayId, setShowRazorpayId] = useState(false);
    const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);
    const router = useRouter()

    const handleFileChange = (e) => {
        if (e.target.name === 'profilepic') {
            setProfilePicName(e.target.files[0]?.name || "");
        } else if (e.target.name === 'coverpic') {
            setCoverPicName(e.target.files[0]?.name || "");
        }
    }

    const getdata = useCallback(async () => {
        if (!session?.user?.name) return;
        let u = await fetchUser(session.user.name);
        setform(u[0])
        setInitialized(true);
    }, [session]);

    useEffect(() => {
        if (!session) {
            router.push('/Login')
        }
        if (session && !initialized) {
            getdata()
        }
    }, [router, session, getdata, initialized])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleFileUpload = async (file, oldPublicId) => {
        if (!file) return;

        setLoading(true);
        try {
            const { url, publicId } = await uploadImage(file, oldPublicId);
            console.log("Uploaded image URL:", url);
            return { url, publicId };
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        let profilePicFile = e.get("profilepic");
        let coverPicFile = e.get("coverpic");
        
        // Upload profile picture if it's a file
        if (profilePicFile && profilePicFile.size > 0 && profilePicFile.name) {
            if(profilePicFile.size >  1024 * 1024) {
                toast.error("Profile picture size exceeds 1MB limit!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    color: "red",
                    transition: Bounce,
                });
                setLoading(false);
                return;
            }
            let currentPublicId = undefined;
            if(form.profilepicId){
                currentPublicId = form.profilepicId;
            } 
            const { url, publicId } = await handleFileUpload(profilePicFile , currentPublicId);
            e.set("profilepic", url);
            if (publicId) e.set("profilepicId", publicId);
        }
        else if (!profilePicFile || profilePicFile.size === 0) {
             e.delete("profilepic");
             if (form.profilepic) {
                 e.set("profilepic", form.profilepic);
             }
             if (form.profilepicId) {
                 e.set("profilepicId", form.profilepicId);
             }
        }

        // Upload cover picture if it's a file
        if (coverPicFile && coverPicFile.size > 0 && coverPicFile.name) {
            if(coverPicFile.size >  1024 * 1024) {
                toast.error("Cover picture size exceeds 1MB limit!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    color: "red",
                    transition: Bounce,
                });
                setLoading(false);
                return;
            }
            let currentPublicId = undefined;
            if(form.coverpicId){
                currentPublicId = form.coverpicId;
            } 
            const { url, publicId } = await handleFileUpload(coverPicFile, currentPublicId);
            e.set("coverpic", url);
            if (publicId) e.set("coverpicId", publicId);
        }
        else if (!coverPicFile || coverPicFile.size === 0) {
             e.delete("coverpic");
             if (form.coverpic) {
                 e.set("coverpic", form.coverpic);
             }
             if (form.coverpicId) {
                 e.set("coverpicId", form.coverpicId);
             }
        }

        update()
        await updateUser(e, session.user.name)
        toast('Profile updated successfully!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            color: "green",
            transition: Bounce,
        });
        setLoading(false);
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center px-2 gap-4 mt-8 pb-10 w-full'
        >
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="w-full max-w-2xl bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-800 shadow-2xl overflow-hidden z-10">
                <div className="bg-neutral-900 p-6 text-center border-b border-neutral-800">
                    <h2 className="text-3xl font-bold text-white mb-2 font-serif">Your Dashboard</h2>
                    <p className="text-neutral-400">Brew your perfect profile</p>
                </div>
                
                <form action={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-neutral-300">Name</label>
                            <input type="text" onChange={handleChange} value={form.name ? form.name : ""} name="name" id="name" 
                                className="bg-neutral-950/50 border border-neutral-800 text-neutral-200 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 placeholder-neutral-600 transition-all duration-300 hover:border-amber-500/50" 
                                placeholder="John" required />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-300">Email address</label>
                            <input type="email" onChange={handleChange} value={form.email ? form.email : ""} name="email" id="email" 
                                className="bg-neutral-950/50 border border-neutral-800 text-neutral-200 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 placeholder-neutral-600 transition-all duration-300 hover:border-amber-500/50" 
                                placeholder="john.doe@gmail.com" required />
                        </motion.div>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-neutral-300">Username</label>
                        <input type="text" onChange={handleChange} value={form.username ? form.username : ""} name="username" id="first_name" 
                            className="bg-neutral-950/50 border border-neutral-800 text-neutral-200 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 placeholder-neutral-600 transition-all duration-300 hover:border-amber-500/50" 
                            placeholder="01John" required />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label htmlFor="about" className="block mb-2 text-sm font-medium text-neutral-300">About / Your Story</label>
                        <textarea onChange={handleChange} value={form.about ? form.about : ""} name="about" id="about" rows="4" 
                            className="bg-neutral-950/50 border border-neutral-800 text-neutral-200 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 placeholder-neutral-600 transition-all duration-300 hover:border-amber-500/50" 
                            placeholder="Tell your fans why you need funding and what your story is..."></textarea>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block mb-2 text-sm font-medium text-neutral-300">Profile Picture<span className="text-xs text-center text-neutral-500 ml-1"> *Size must be less than 1MB</span></label>
                            <label htmlFor="profilepic" 
                                className="flex items-center justify-center w-full h-12 bg-neutral-950/50 border-2 border-dashed border-neutral-800 text-neutral-400 text-sm rounded-lg hover:bg-neutral-900 hover:border-amber-500 cursor-pointer transition-all duration-300 group">
                                <span className="truncate px-4 group-hover:text-amber-500 transition-colors">{profilePicName ? profilePicName : "Choose File"}</span>
                            </label>
                            <input type="file" name="profilepic" id="profilepic" className="hidden" onChange={handleFileChange} />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="block mb-2 text-sm font-medium text-neutral-300">Cover Picture <span className="text-xs text-center text-neutral-500 ml-1"> *Size must be less than 1MB</span> </label>
                            <label htmlFor="coverpic" 
                                className="flex items-center justify-center w-full h-12 bg-neutral-950/50 border-2 border-dashed border-neutral-800 text-neutral-400 text-sm rounded-lg hover:bg-neutral-900 hover:border-amber-500 cursor-pointer transition-all duration-300 group">
                                <span className="truncate px-4 group-hover:text-amber-500 transition-colors">{coverPicName ? coverPicName : "Choose File"}</span>
                            </label>
                            <input type="file" name="coverpic" id="coverpic" className="hidden" onChange={handleFileChange} />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <label htmlFor="razorpayId" className="block mb-2 text-sm font-medium text-neutral-300">RazorPay ID</label>
                            <div className="relative w-full">
                                <input type={showRazorpayId ? "text" : "password"} onChange={handleChange} value={form.razorpayId ? form.razorpayId : ""} name="razorpayId" id="phone" 
                                    className="bg-neutral-950/50 border border-neutral-800 text-neutral-200 w-full text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2.5 pr-10 placeholder-neutral-600 transition-all duration-300 hover:border-amber-500/50" 
                                    placeholder="Razorpay Id" required />
                                <button type="button" onClick={() => setShowRazorpayId(!showRazorpayId)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-amber-500 transition-colors duration-200">
                                    {showRazorpayId ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium text-neutral-300">RazorPay Secret</label>
                            <div className="relative w-full">
                                <input type={showRazorpaySecret ? "text" : "password"} onChange={handleChange} value={form.razorpaySecret ? form.razorpaySecret : ""} name="razorpaySecret" id="website" 
                                    className="bg-neutral-950/50 border border-neutral-800 text-neutral-200 w-full text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2.5 pr-10 placeholder-neutral-600 transition-all duration-300 hover:border-amber-500/50" 
                                    placeholder="Razorpay Secret" required />
                                <button type="button" onClick={() => setShowRazorpaySecret(!showRazorpaySecret)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-amber-500 transition-colors duration-200">
                                    {showRazorpaySecret ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex items-start mb-6 mt-2">
                        <div className="flex items-center h-5">
                            <motion.input 
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                id="remember" type="checkbox" value="" 
                                className="w-4 h-4 border border-neutral-700 rounded-sm bg-neutral-900 text-amber-600 focus:ring-3 focus:ring-amber-600 ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-neutral-300">I agree with the <a href="#" className="text-amber-500 hover:underline hover:text-amber-400">terms and conditions</a>.</label>
                    </div>
                    
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={loading}
                        className={`w-full text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:ring-4 focus:outline-none focus:ring-amber-900/50 font-medium rounded-lg text-sm px-5 py-3 text-center shadow-lg hover:shadow-amber-900/40 transition-all font-bold flex justify-center items-center relative overflow-hidden ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <motion.div 
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                />
                                <svg aria-hidden="true" role="status" className="inline w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                            </>
                        ) : (
                            "Save Profile"
                        )}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    )
}

export default Dashform
