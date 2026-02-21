"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, BarChart3, Zap, Palette, Users } from 'lucide-react';

const Features = () => {
    const features = [
        {
            title: "Zero Fees for Beta",
            icon: <ShieldCheck className="w-8 h-8" />,
            description: "Keep 100% of your earnings during our beta phase. No hidden costs or deductions.",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            hover: "group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        },
        {
            title: "Global Payments",
            icon: <Globe className="w-8 h-8" />,
            description: "Accept payments from anywhere in the world with seamless multi-currency support.",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            hover: "group-hover:bg-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        },
        {
            title: "Creator Dashboard",
            icon: <BarChart3 className="w-8 h-8" />,
            description: "Powerful insights and analytics to track your growth, earnings, and fan engagement.",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            hover: "group-hover:bg-purple-500/20 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        },
        {
            title: "Instant Access",
            icon: <Zap className="w-8 h-8" />,
            description: "Funds are transferred to your account instantly. No waiting periods for your hard-earned money.",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            hover: "group-hover:bg-yellow-500/20 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
        },
        {
            title: "Custom Branding",
            icon: <Palette className="w-8 h-8" />,
            description: "Personalize your page with custom themes, colors, and layouts to match your unique brand.",
            color: "text-pink-400",
            bg: "bg-pink-500/10",
            hover: "group-hover:bg-pink-500/20 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
        },
        {
            title: "Community Driven",
            icon: <Users className="w-8 h-8" />,
            description: "Join a thriving network of creators. Collaborate, share, and grow together.",
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            hover: "group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-[#3b2f30] via-[#2a2122] to-[#1a1415] text-white overflow-hidden relative">
             {/* Decorative Elements */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[128px]"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-purple-600 rounded-full blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
                        Why Choose Us?
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        We provide the best tools for creators to monetize their passion. 
                        Simple, transparent, and built for you.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
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
