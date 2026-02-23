"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { uploadImage } from '../app/actions';
import { useRouter } from 'next/navigation';
import { fetchUser, updateUser } from '../action/useractions';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { set } from 'mongoose';




const Dashform = () => {
    const { data: session, update } = useSession()
    const [form, setform] = useState({})
    const [loading, setLoading] = useState(false)
    const [publicId, setPublicId] = useState(null);
    const [initialized, setInitialized] = useState(false) // New line
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
        setInitialized(true); // Mark as initialized
    }, [session]);

    // Only run once on mount, or if session changes AND not yet initialized
    useEffect(() => {
        if (!session) {
            router.push('/Login')
        }
        if (session && !initialized) { // Only fetch if we haven't already
            getdata()
        }
    }, [router, session, getdata, initialized])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleFileUpload = async (file, oldPublicId) => {
        // const file = e.target.files[0];
        if (!file) return;


        setLoading(true);
        try {
            const { url, publicId } = await uploadImage(file, oldPublicId);
            console.log("Uploaded image URL:", url);
            return { url, publicId };
            // setform({ ...form, [file.name]: url });


        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setLoading(false);
        }

    };
    const handleSubmit = async (e) => {
        let profilePicFile = e.get("profilepic");
        let coverPicFile = e.get("coverpic");
        console.log(profilePicFile, coverPicFile)
        

            // Upload profile picture if it's a file
            if (profilePicFile && profilePicFile.size > 0 && profilePicFile.name) {
                let currentPublicId = undefined;
                // Use the ID directly from the database if it exists
                if(form.profilepicId){
                    currentPublicId = form.profilepicId;
                } 
                console.log("publicId:", currentPublicId )
                const { url, publicId } = await handleFileUpload(profilePicFile , currentPublicId);
                e.set("profilepic", url);
                if (publicId) e.set("profilepicId", publicId); // Update profilepicId in DB
                
            }
            // else remove it if it's not a new file, so we don't accidentally send a file object or empty string
            else if (!profilePicFile || profilePicFile.size === 0) {
                 e.delete("profilepic");
                 // If you need to preserve existing URL:
                 if (form.profilepic) {
                     e.set("profilepic", form.profilepic);
                 }
                 if (form.profilepicId) {
                     e.set("profilepicId", form.profilepicId);
                 }
            }


            // Upload cover picture if it's a file
            if (coverPicFile && coverPicFile.size > 0 && coverPicFile.name) {
                let currentPublicId = undefined;
                // Use the ID directly from the database if it exists
                if(form.coverpicId){
                    currentPublicId = form.coverpicId;
                } 
                console.log("publicId:", currentPublicId)
                const { url, publicId } = await handleFileUpload(coverPicFile, currentPublicId);
                e.set("coverpic", url);
                if (publicId) e.set("coverpicId", publicId); // Update coverpicId in DB
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
        let a = await updateUser(e, session.user.name)
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
    }
    return (
        <div className='flex flex-col justify-center items-center gap-4 mt-4 '>
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

            <form action={handleSubmit}>
                <div className="flex flex-col justify-center items-center mb-4 mx-auto w-[90vw] md:w-[90vw]  ">
                    <div className="">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium  text-white">Name</label>
                        <input type="text" onChange={handleChange} value={form.name ? form.name : ""} name="name" id="name" className="bg-gray-50 border   w-[90vw] md:w-[60vw] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5   placeholder-gray-400 " placeholder="John" required />
                    </div>
                    <div className="">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">Email address</label>
                        <input type="email" onChange={handleChange} value={form.email ? form.email : ""} name="email" id="email" className="bg-gray-50 border   w-[90vw] md:w-[60vw] text-sm rounded-lg  block  p-2.5  border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="john.doe@gmail.com" required />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium  text-white">Username</label>
                        <input type="text" onChange={handleChange} value={form.username ? form.username : ""} name="username" id="first_name" className="bg-gray-50 border   w-[90vw] md:w-[60vw] text-sm rounded-lg  block  p-2.5  border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="01John" required />
                    </div>
                    <div>
                        <label htmlFor="about" className="block mb-2 text-sm font-medium  text-white">About / Your Story</label>
                        <textarea onChange={handleChange} value={form.about ? form.about : ""} name="about" id="about" rows="4" className="bg-gray-50 border   w-[90vw] md:w-[60vw] text-sm rounded-lg  block p-2.5  border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Tell your fans why you need funding and what your story is..."></textarea>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium  text-white">Profile Picture</label>
                        <label htmlFor="profilepic" className="bg-gray-50 border   w-[90vw] md:w-[60vw] text-sm rounded-lg  cursor-pointer">
                            {profilePicName ? profilePicName : "Choose File"}
                        </label>
                        <input type="file" name="profilepic" id="profilepic" className="hidden" onChange={handleFileChange} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium  text-white">Cover Picture</label>
                        <label htmlFor="coverpic" className="bg-gray-50 border   w-[90vw] md:w-[60vw] text-sm rounded-lg  block p-2.5  border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
                            {coverPicName ? coverPicName : "Choose File"}
                        </label>
                        <input type="file" name="coverpic" id="coverpic" className="hidden" onChange={handleFileChange} />
                    </div>
                    <div>
                        <label htmlFor="razorpayId" className="block mb-2 text-sm font-medium  text-white">RazorPay ID</label>
                        <div className="relative w-[90vw] md:w-[60vw]">
                            <input type={showRazorpayId ? "text" : "password"} onChange={handleChange} value={form.razorpayId ? form.razorpayId : ""} name="razorpayId" id="phone" className="bg-gray-50 border   w-full text-sm rounded-lg  block p-2.5 pr-10  border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Razorpay Id" required />
                            <button type="button" onClick={() => setShowRazorpayId(!showRazorpayId)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                {showRazorpayId ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium  text-white">RazorPay Secret</label>
                        <div className="relative w-[90vw] md:w-[60vw]">
                            <input type={showRazorpaySecret ? "text" : "password"} onChange={handleChange} value={form.razorpaySecret ? form.razorpaySecret : ""} name="razorpaySecret" id="website" className="bg-gray-50 border   w-full text-sm rounded-lg  block p-2.5 pr-10  border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Razorpay Secret" required />
                            <button type="button" onClick={() => setShowRazorpaySecret(!showRazorpaySecret)} className="absolute inset-y-0 right-0 flex items-center pr-3  hover:text-gray-200 transition-colors duration-200">
                                {showRazorpaySecret ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start mb-6 mt-2">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border  rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300  border-gray-600  ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium  text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline ">terms and conditions</a>.</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  focus:ring-blue-800">Submit</button>
                </div>
            </form>




        </div>
    )
}

export default Dashform
