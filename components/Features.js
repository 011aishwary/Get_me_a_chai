"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    { title: "Zero Fees for Beta", icon: "💎", description: "Keep 100% of your earnings during our beta phase. No hidden costs." },
    { title: "Global Payments", icon: "🌍", description: "Accept payments from anywhere with multi-currency support." },
    { title: "Creator Dashboard", icon: "📊", description: "Powerful analytics to track your growth and fan engagement." },
    { title: "Instant Access", icon: "⚡", description: "Funds are transferred to your account instantly upon payment." },
    { title: "Custom Branding", icon: "🎨", description: "Personalize your page to match your unique style and brand." },
    { title: "Community Driven", icon: "🤝", description: "Join a supportive network of creators and change-makers." },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#3b2f30] to-[#5c4a4a] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
             Why Choose Us?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We built Get Me a Chai to empower creators like you with the tools you need to succeed.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
                whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "rgb(99 102 241)"
                }}
              className="bg-[#2a2425] p-8 rounded-2xl border border-gray-700 transition-all duration-300 group cursor-default shadow-lg"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 inline-block drop-shadow-md">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
