"use client"
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Coffeemug = ({ loop = false }) => {
  return (

    <div className='w-16 md:w-20 h-16 md:h-20'> {/* Added container with responsive width */}
      <DotLottieReact
              src="https://lottie.host/f50ceada-8791-44df-8814-9a4f4afd64b3/ee93WA4Fj7.lottie"
              loop={loop} // Set loop to true by default, but allow it to be overridden by props
              autoplay
              className="w-full h-full"
            />
    </div>
  )
}

export default Coffeemug
