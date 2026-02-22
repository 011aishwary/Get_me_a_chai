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
    const router = useRouter()
    const getdata = useCallback(async () => {
        if (!session?.user?.name) return;
        let u = await fetchUser(session.user.name);
        //  console.log("user deteils")
        //  console.log(u[0])
        setform(u[0])
    }, [session]);


    useEffect(() => {
        getdata()
        if (!session) {
            router.push('/Login')
        }
    }, [router, session, getdata])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleFileUpload = async (file) => {
        // const file = e.target.files[0];
        if (!file) return;


        setLoading(true);
        try {
            const url = await uploadImage(file);
            console.log("Uploaded image URL:", url);
            return url;
            // setform({ ...form, [file.name]: url });
            

        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setLoading(false);
        }

    };
    const handleSubmit = async (e) => {
        let profilePicFile = e.get("profilepic");
        console.log(profilePicFile)
        let coverPicFile = e.get("coverpic");

        // Upload profile picture if it's a file
        if (profilePicFile && profilePicFile.size > 0 && profilePicFile.name) {
             const url = await handleFileUpload(profilePicFile);
             console.log("Profile picture URL:", url);
             e.set("profilepic", url);
        }

        // Upload cover picture if it's a file
        if (coverPicFile && coverPicFile.size > 0 && coverPicFile.name) {
             const url = await handleFileUpload(coverPicFile);
             e.set("coverpic", url);
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
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" onChange={handleChange} value={form.name ? form.name : ""} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 w-[90vw] md:w-[60vw] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                    </div>
                    <div className="">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" onChange={handleChange} value={form.email ? form.email : ""} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 w-[90vw] md:w-[60vw] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" onChange={handleChange} value={form.username ? form.username : ""} name="username" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 w-[90vw] md:w-[60vw] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>
                    <div>
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input type="file"  name="profilepic" id="profilepic" className="bg-gray-50 border border-gray-300 text-gray-900 w-[90vw] md:w-[60vw] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input type="file"  name="coverpic" id="coverpic" className="bg-gray-50 border border-gray-300 text-gray-900 w-[90vw] md:w-[60vw] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="razorpayId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RazorPay ID</label>
                        <input type="text" onChange={handleChange} value={form.razorpayId ? form.razorpayId : ""} name="razorpayId" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 w-[90vw] md:w-[60vw] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Razorpay Id" required />
                    </div>
                    <div>
                        <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RazorPay Secret</label>
                        <input type="text" onChange={handleChange} value={form.razorpaySecret ? form.razorpaySecret : ""} name="razorpaySecret" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 w-[90vw] md:w-[60vw] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                    </div>

                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>




        </div>
    )
}

export default Dashform
