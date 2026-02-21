"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { name: "John Doe", role: "Indie Developer", quote: "Get Me a Chai helped me fund my game development without any hassle. The support is amazing!", avatar: "👨‍💻" },
  { name: "Jane Smith", role: "Digital Artist", quote: "I love how easy it is to setup. My followers started supporting me instantly!", avatar: "🎨" },
  { name: "Mike Ross", role: "Podcaster", quote: "The best platform for creators. Zero fees in beta is a huge plus for starting out.", avatar: "🎙️" },
];

const Testimonials = () => {
    // Simple state could be used here for a slider, but a grid is cleaner for now
    
  return (
    <section className="py-24 bg-[#5c4a4a] relative overflow-hidden">
        {/* Animated pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black"></div>

      <div className="container mx-auto px-6 text-center z-10 relative">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#f2f2ef] mb-16 tracking-tight"
        >
          What Creators Say
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
               }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-[#3b2f30] p-8 rounded-3xl shadow-xl border border-gray-600 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg scale-100 filter grayscale-0">
                  {t.avatar}
              </div>
              
              <p className="text-gray-300 italic mb-6 text-lg relative z-10 leading-relaxed font-light">
                  &quot;{t.quote}&quot;
              </p>
              
              <div className="mt-auto">
                  <h4 className="text-xl font-bold text-[#f2f2ef] group-hover:text-indigo-300 transition-colors">{t.name}</h4>
                  <span className="text-sm text-indigo-400 font-medium uppercase tracking-wider">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
