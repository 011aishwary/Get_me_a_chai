// "use client"
import React from 'react'
// import { useParams } from 'next/navigation'
import Paymentpage from '../../components/Paymentpage'
import { notFound } from 'next/navigation'
import connectDB from '../../db/connectDB'
import User from '../../models/User'

export default async function Username({params}){
  // const params = useParams();
  // console.log(params.username)
  // if username is not valid then show 404 page
  const  checkuser = async ()=> {
    await connectDB();
    let user = await User.findOne({ username:  decodeURIComponent(params.username).replace(/\s+/g, " ")});
    if(!user){
      return notFound();
    }

    
  }
  await checkuser();
  return (
    <>
      <Paymentpage username={params.username}/>
    </>
  );
}


