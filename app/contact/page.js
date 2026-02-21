'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Helper logic here normally
    console.log(formData);
    alert('Message sent! (Simulated)');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen text-white py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        
        {/* Contact Info Section */}
        <motion.div 
          className="bg-[#5c4a4a] p-8 rounded-3xl shadow-2xl border border-[#806354]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-[#f2f2ef]">Get in Touch</h2>
          <p className="text-lg text-gray-300 mb-8">
            Have questions, suggestions, or just want to say hi? We'd love to hear from you.
          </p>

          <div className="space-y-6">
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-600 rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#f2f2ef]">Email</h3>
                <p className="text-gray-300">support@getmeachai.com</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="p-3 bg-purple-600 rounded-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#f2f2ef]">Phone</h3>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
            </motion.div>

             <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="p-3 bg-pink-600 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#f2f2ef]">Office</h3>
                <p className="text-gray-300">123 Creator St, Tech City, TC 90210</p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12">
             <h3 className="text-2xl font-bold mb-4 text-[#f2f2ef]">Follow Us</h3>
             <div className="flex space-x-4 text-2xl cursor-pointer">
                <span className="hover:text-indigo-400 transition-colors">🐦</span>
                <span className="hover:text-blue-600 transition-colors">📘</span>
                <span className="hover:text-pink-500 transition-colors">📸</span>
             </div>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-[#f2f2ef]">Send a Message</h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#3b2f30] border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 outline-none transition-all"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#3b2f30] border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-[#3b2f30] border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 outline-none transition-all resize-none"
                placeholder="How can we help?"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg hover:shadow-indigo-500/30"
            >
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactPage;
