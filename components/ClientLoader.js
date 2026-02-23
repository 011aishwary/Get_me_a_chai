"use client"
import React, { useState, useEffect } from 'react'
import LoadingAnimation from './LoadingAnimation'

const ClientLoader = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Force a minimum loading time for the animation to be seen
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500) // 1.5 seconds splash screen
        
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return <LoadingAnimation />
    }

    return (
        <>
            {children}
        </>
    )
}

export default ClientLoader
