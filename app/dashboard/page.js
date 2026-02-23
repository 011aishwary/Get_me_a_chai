"use client"
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import {  useEffect } from 'react';


import { useRouter } from 'next/navigation';
import Dashform from '../../components/Dashboard';

const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter()
    useEffect(() => {
      if(!session) {
      // form.registerField()
        router.push('/Login')
        }
    }, [session , router])
    
    
    
  return (
    <div className='min-h-screen bg-neutral-950 text-white pt-24'>
      <Dashform/>
    </div>
  )
}

export default Dashboard
