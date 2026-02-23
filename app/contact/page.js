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
    <div className="min-h-screen bg-neutral-950 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        
        {/* Contact Info Section */}
        <motion.div 
          className="bg-neutral-900 p-8 rounded-3xl shadow-2xl border border-neutral-800"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-white">Get in Touch</h2>
          <p className="text-lg text-neutral-300 mb-8">
            Have questions, suggestions, or just want to say hi? We&apos;d love to hear from you.
          </p>

          <div className="space-y-6">
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                <Mail className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Email</h3>
                <p className="text-neutral-400">support@getmeachai.com</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                <Phone className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Phone</h3>
                <p className="text-neutral-400">+1 (555) 123-4567</p>
              </div>
            </motion.div>

             <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                <MapPin className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Office</h3>
                <p className="text-neutral-400">123 Creator St, Tech City, TC 90210</p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12">
             <h3 className="text-2xl font-bold mb-4 text-white">Follow Us</h3>
             <div className="flex space-x-4 text-2xl cursor-pointer text-neutral-400">
                <span className="hover:text-amber-500 transition-colors">🐦</span>
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
          className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">Send a Message</h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-white placeholder-neutral-500 outline-none transition-all"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-white placeholder-neutral-500 outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-white placeholder-neutral-500 outline-none transition-all resize-none"
                placeholder="How can we help?"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg hover:shadow-amber-500/30"
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
