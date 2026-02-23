"use client"
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState ,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Login = () => {
    const [inputValue, setInputValue] = useState('');
    const { data: session } = useSession()
    const router = useRouter()
    useEffect(() => {
      if(session) {
        // form.registerField()
        router.push('/dashboard')
    }
    }, [session , router])
    
    
    

    const handleChange = (event) => {
            setInputValue(event.target.value);
    };
    return (
    <div id="login-popup" tabIndex="-1"

        className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">

            <div className="relative bg-white rounded-lg shadow">
                <button type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"><svg
                        aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Close popup</span>
                </button>

                <div className="p-5">
                    <h3 className="text-2xl mb-0.5 font-medium"></h3>
                    <p className="mb-4 text-sm font-normal text-gray-800"></p>

                    <div className="text-center">
                        <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                            Login to your account
                        </p>
                        <p className="mt-2 text-sm leading-4 text-slate-600">
                            You must be logged in to perform this action.
                        </p>
                    </div>

                    <div className="mt-7 flex flex-col gap-2">

                        <button onClick={()=>{signIn("github")}}
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><Image
                                src="https://www.svgrepo.com/show/512317/github-142.svg" width={18} height={18} alt="GitHub"
                                className="h-[18px] w-[18px] " />
                                Continue with GitHub
                        </button>

                       
                        <button onClick={()=>{signIn("google")}}
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><Image
                                src="https://www.svgrepo.com/show/475656/google-color.svg" width={18} height={18} alt="Google"
                                className="h-[18px] w-[18px] "/>Continue with
                                Google
                        </button>


                        
                        
                    </div>

                    


                    

                    {/* <div className="mt-6 text-center text-sm text-slate-600">
                        Don't have an account?
                        <a href="/signup" className="font-medium text-[#4285f4]">Sign up</a>
                    </div> */}
                </div>

            </div>
        </div>
    </div>

        


)}

export default Login
