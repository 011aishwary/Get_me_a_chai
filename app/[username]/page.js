// "use client"
import React from 'react'
// import { useParams } from 'next/navigation'
import Paymentpage from '../../components/Paymentpage'
import { notFound } from 'next/navigation'
import connectDB from '../../db/connectDB'
import User from '../../models/User'

export default async function Username({params}){
  const param = await params;

  // if username is not valid then show 404 page
  const  checkuser = async ()=> {
    await connectDB();
    let user = await User.findOne({ username:  decodeURIComponent(param.username).replace(/\s+/g, " ")});
    if(!user){
      return notFound();
    }
    // Return a plain object to avoid passing Mongoose documents to Client Components
    return JSON.parse(JSON.stringify(user));
  }
  
  const user = await checkuser();
  return (
    <>
      <Paymentpage username={param.username}/>
    </>
  );
}


