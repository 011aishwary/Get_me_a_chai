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
    <div>
      <Dashform/>
    </div>
  )
}

export default Dashboard
