import React from 'react';
import { motion } from 'framer-motion';

const BossMotorSplash = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.4
            }
        }
    };

    const logoVariants = {
        hidden: {
            scale: 0,
            rotate: -180,
            opacity: 0
        },
        visible: {
            scale: 1,
            rotate: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 10,
                duration: 1.2
            }
        }
    };

    const phraseVariants = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                duration: 0.8
            }
        }
    };

    const wordVariants = {
        hidden: {
            scale: 0,
            opacity: 0
        },
        visible: (i) => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: i * 0.3,
                type: "spring",
                stiffness: 150,
                damping: 8
            }
        })
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-red-900 flex flex-col items-center justify-center z-50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Main Logo */}
            <motion.div
                className="text-center mb-8"
                variants={logoVariants}
            >
                <motion.h1
                    className="text-7xl md:text-9xl font-bold text-white tracking-wider"
                    variants={pulseVariants}
                    animate="pulse"
                >
                    BOSS
                </motion.h1>
                <motion.h2
                    className="text-5xl md:text-7xl font-bold text-red-500 tracking-wider mt-4"
                    variants={pulseVariants}
                    animate="pulse"
                >
                    MOTOR
                </motion.h2>
            </motion.div>

            {/* Phrase Container */}
            <motion.div
                className="text-center space-y-4"
                variants={phraseVariants}
            >
                {/* EYE IT! */}
                <motion.div
                    className="flex justify-center space-x-2"
                    custom={0}
                    variants={wordVariants}
                >
                    <span className="text-2xl md:text-4xl font-bold text-yellow-400 bg-black bg-opacity-50 px-6 py-3 rounded-lg shadow-2xl border-2 border-yellow-400">
                        EYE
                    </span>
                    <span className="text-2xl md:text-4xl font-bold text-yellow-400">IT!</span>
                </motion.div>

                {/* TRY IT! */}
                <motion.div
                    className="flex justify-center space-x-2"
                    custom={1}
                    variants={wordVariants}
                >
                    <span className="text-2xl md:text-4xl font-bold text-green-400 bg-black bg-opacity-50 px-6 py-3 rounded-lg shadow-2xl border-2 border-green-400">
                        TRY
                    </span>
                    <span className="text-2xl md:text-4xl font-bold text-green-400">IT!</span>
                </motion.div>

                {/* BUY IT! */}
                <motion.div
                    className="flex justify-center space-x-2"
                    custom={2}
                    variants={wordVariants}
                >
                    <span className="text-2xl md:text-4xl font-bold text-red-400 bg-black bg-opacity-50 px-6 py-3 rounded-lg shadow-2xl border-2 border-red-400">
                        BUY
                    </span>
                    <span className="text-2xl md:text-4xl font-bold text-red-400">IT!</span>
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
                className="absolute bottom-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
            >
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-2"></div>
                <p className="text-white text-sm opacity-70">Premium Automotive Experience</p>
            </motion.div>

            {/* Animated Background Elements */}
            <motion.div
                className="absolute top-10 left-10 w-20 h-20 border-2 border-red-500 rounded-full"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.1, 0.3],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <motion.div
                className="absolute bottom-10 right-10 w-16 h-16 border-2 border-yellow-400 rounded-full"
                animate={{
                    scale: [1.5, 1, 1.5],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [360, 180, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </motion.div>
    );
};

export default BossMotorSplash;