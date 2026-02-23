"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const steps = [
    {
      title: "Create Your Project",
      icon: "🏗️",
      description: "Set up your funding page in minutes. Share your story, goals, and passions with the world.",
      color: "from-amber-400 to-amber-600",
      delay: 0.1
    },
    {
      title: "Share Your Link",
      icon: "🔗",
      description: "Spread the word on social media, email, or your website. Let your fans know how they can support you.",
      color: "from-orange-400 to-orange-600",
      delay: 0.3
    },
    {
      title: "Get Funded",
      icon: "💰",
      description: "Start receiving contributions directly. No hassle, just direct support for your creativity.",
      color: "from-yellow-400 to-yellow-600",
      delay: 0.5
    },
  ];

  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
        {/* Animated stripes background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-shimmer"></div>
        </div>

      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-16"
        >
          How It Works
        </motion.h2>

        <motion.div 
          className="grid md:grid-cols-3 gap-12 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
             {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neutral-700 to-transparent -z-10 transform -translate-y-1/2 opacity-30"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10, rotate: 1 }}
              className="bg-neutral-900 p-8 rounded-3xl shadow-2xl relative border border-white/5 hover:border-amber-500/50 transition-colors group"
            >
               <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-4xl shadow-lg ring-4 ring-neutral-950 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
               </div>

              <h3 className="text-2xl font-bold text-white mt-10 mb-4 group-hover:text-amber-400 transition-colors">{step.title}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {step.description}
              </p>
              
              <div className="absolute bottom-4 right-4 text-6xl font-bold text-white/5 pointer-events-none select-none">
                   {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
