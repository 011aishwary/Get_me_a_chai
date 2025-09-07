"use client"
import React from 'react'
import Script from 'next/script'
import { useState, useEffect , useCallback } from 'react'
import { initiate } from '../action/useractions'
import { useSession } from 'next-auth/react'
import { fetchUser } from '../action/useractions'
import { fetchPayments } from '../action/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { get } from 'http'



const Paymentpage = ({ username }) => {
    // const {data: session} = useSession()
    const router = useRouter()

    const [form, setform] = useState({})
    const [currentuser, setCurrentuser] = useState({})
    const [payments, setpayments] = useState([])
    const searchParams = useSearchParams();


    useEffect(() => {
        if (searchParams.get('paymentdone') === "true") {
            toast(' Payment Successful!', {
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
        router.push(`/${username}`)
    }, [router, searchParams, username])


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }
    const getpayments = useCallback(async () => {
        let u = await fetchUser(username);
        let userObj = Array.isArray(u) ? (u[0] || {}) : (u || {});
        setCurrentuser(userObj);
        let p = await fetchPayments(username);
        // console.log(p);
        setpayments(p);
    }, [username]);
    useEffect(() => {
        getpayments()


    }, [getpayments])
    
    const pay = async (amount) => {
        // get order id
        let a = await initiate(amount, username, form)

        let orderid = a.id
        var options = {
            "key": currentuser.razorpayId, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get me a Chai",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderid, //This is a sample Order ID. Pass the id obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": "Aishwary Gupta",
                "email": "aishwaryg01@gmail.com",
                "contact": "8795157597"
            },
            "notes": {
                "address": "Get me a Chai Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }


        }
        var rzp1 = new Razorpay(options);
        rzp1.open()
    }
    return (
        <>
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
            {/* <button id="rzp-button1">Pay with Razorpay</button> */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div>
                <div className="w-full h-[40vh] relative">
                    <Image className='w-full h-[50vh] object-cover ' width={1000} height={500} quality={75} src={currentuser.coverpic || '/default-cover.jpg'} alt={currentuser.coverpic ? "Cover image" : "Default cover"} />
                    <div className="">
                        <Image className='h-[100px] w-[100px] rounded-2xl border relative bottom-[13vh] mb-10 left-[47%]' width={45} height={45} src={currentuser.profilepic || '/avatar.png'} alt={currentuser.profilepic ? "Profile picture" : "Default avatar"} />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 text-[#f2f2ef] mt-[14vh] relative">
                    <div className=""><h1 className='text-3xl  '>{decodeURIComponent(username).replace(/\s+/g, " ")}</h1></div>
                    <div className="">Raising funds for {decodeURIComponent(username).replace(/\s+/g, " ")}</div>
                    <div className="">{payments.length} people raised funds . total funds raised  {"₹ "}{payments.reduce((acc, curr) => acc + curr.amount, 0)} total</div>
                </div>

                <div className="flex w-[80vw] gap-8 h-[60vh] relative mx-auto mt-6 mb-6 ">
                    <ul className="scrollhide bg-[#3b2f30] overflow-x-scroll w-full h-ful pt-6 pl-6 mx-6 ">
                        <li className="mx-2 relative">Supporters</li>
                        {payments.length === 0 ? (
                            <li className='text-center mt-10'>No supporters yet. Be the first one!</li>
                        ) :

                            payments.map((p, index) => {
                                return (
                                    <li key={index} className="flex items-center gap-1 pl-4 my-3">
                                        <Image width={32} height={32} className='w-8 h-8 ' src="/avatar.png" alt="" />
                                        <span> {p.name} donated <span className='font-bold'>{p.amount}</span> with a message {p.message} </span>
                                    </li>
                                )
                            })

                        }




                    </ul>
                    <div className="bg-[#3b2f30] w-full h-full">
                        <form>
                            <div className="flex flex-col justify-center items-center mt-4 mx-auto ">
                                <span>Make Payment</span>
                                <div className="">
                                    <label htmlFor="name" className="block  mt-1 mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" onChange={handleChange} value={form.name ? form.name : ""} name="name" id="name" className="bg-gray-50 border w-[30vw] border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                                </div>
                                <div className="">
                                    <label htmlFor="message" className="block  mt-1 mb-1 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                                    <input type="text" onChange={handleChange} value={form.message ? form.message : ""} name="message" id="message" className="bg-gray-50 border w-[30vw] border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message" required />
                                </div>
                                <div>
                                    <label htmlFor="amount" className="block mt-1 mb-1 text-sm font-medium text-gray-900 dark:text-white">Enter Amount</label>
                                    <input type="number" onChange={handleChange} value={form.amount ? form.amount : ""} name="amount" id="amount" className="bg-gray-50 border w-[30vw] border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount" required />
                                </div>
                                <div className="flex gap-3 mt-2 justify-evenly w-full">
                                    <span onClick={() => setform({ ...form, amount: 10 })} className="px-8 py-2 border-0 rounded-2xl bg-blue-950 w-auto ">{"$ 10"}</span>
                                    <span onClick={() => setform({ ...form, amount: 20 })} className="px-8 py-2 border-0 rounded-2xl bg-blue-950 w-auto ">{"$ 20"}</span>
                                    <span onClick={() => setform({ ...form, amount: 30 })} className="px-8 py-2 border-0 rounded-2xl bg-blue-950 w-auto ">{"$ 30"}</span>
                                </div>
                                <button onClick={() => pay((form.amount) * 100)} type='button' className="text-white mt-2 disabled:bg-[#260542] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={!form.amount || form.name.length < 3 || form.message.length < 3}>Pay</button>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Paymentpage
