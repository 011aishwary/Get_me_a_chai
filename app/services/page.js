'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, Heart, Coins, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: <Coins className="w-12 h-12 text-yellow-400" />,
    title: "Direct Support",
    description: "Receive funds directly from your audience with no intermediaries holding you back.",
  },
  {
    icon: <Zap className="w-12 h-12 text-blue-400" />,
    title: "Instant Payouts",
    description: "Get paid instantly. We partner with top payment gateways to ensure you get your money fast.",
  },
  {
    icon: <Shield className="w-12 h-12 text-green-400" />,
    title: "Secure Transactions",
    description: "Your earnings are safe with our industry-standard encryption and fraud prevention measures.",
  },
  {
    icon: <Heart className="w-12 h-12 text-red-400" />,
    title: "Fan Engagement",
    description: "Build a community. Engage with your supporters through exclusive updates and content.",
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-purple-400" />,
    title: "Analytics Dashboard",
    description: "Track your growth. Detailed insights into your earnings and supporter demographics.",
  },
  {
    icon: <CheckCircle className="w-12 h-12 text-indigo-400" />,
    title: "Verified Badge",
    description: "Get verified. Show your authenticity and build trust with your audience.",
  },
];

const ServicesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-white mb-4 tracking-tight"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-neutral-300 max-w-2xl mx-auto mb-16"
        >
          Everything you need to turn your passion into a sustainable career.
        </motion.p>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-neutral-900 p-8 rounded-2xl shadow-lg border border-neutral-800 hover:shadow-2xl hover:border-amber-500 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 bg-neutral-800 rounded-full group-hover:bg-neutral-700 transition-colors duration-300 border border-neutral-700">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-neutral-400">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
