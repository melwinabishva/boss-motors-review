// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.1,
            when: "beforeChildren",
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    }
};

const floatingVariants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const pulseVariants = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.5, 0.3],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const buttonHoverVariants = {
    hover: {
        scale: 1.05,
        y: -2,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 17
        }
    },
    tap: {
        scale: 0.95,
        y: 0
    }
};

const NotFound = () => {
    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="absolute bottom-6 left-6 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"
                variants={pulseVariants}
                animate="animate"
            />
            <motion.div
                className="absolute top-6 right-6 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl"
                variants={pulseVariants}
                animate="animate"
                transition={{ delay: 1 }}
            />
            <motion.div
                className="absolute top-1/2 left-1/4 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl"
                variants={pulseVariants}
                animate="animate"
                transition={{ delay: 2 }}
            />

            <motion.div
                className="relative mb-8"
                variants={floatingVariants}
                animate="animate"
            >
                <motion.div
                    className="text-9xl font-bold text-gray-800 opacity-10 absolute -top-4 -left-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    404
                </motion.div>

                <motion.div
                    className="relative"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <svg
                        className="w-48 h-48 text-blue-500 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </motion.div>
            </motion.div>

            <motion.div className="max-w-md mx-auto" variants={containerVariants}>
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                    variants={itemVariants}
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    className="text-lg text-gray-600 mb-2"
                    variants={itemVariants}
                >
                    Oops! The page you're looking for seems to have wandered off.
                </motion.p>

                <motion.p
                    className="text-gray-500 mb-8"
                    variants={itemVariants}
                >
                    Don't worry, even the best explorers get lost sometimes. Let's get you back on track.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    variants={itemVariants}
                >
                    <motion.div variants={buttonHoverVariants} whileHover="hover" whileTap="tap">
                        <Link
                            to="/"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                            <motion.svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </motion.svg>
                            Go Back Home
                        </Link>
                    </motion.div>

                    <motion.div variants={buttonHoverVariants} whileHover="hover" whileTap="tap">
                        <button
                            onClick={() => window.history.back()}
                            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
                        >
                            <motion.svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </motion.svg>
                            Go Back
                        </button>
                    </motion.div>
                </motion.div>


            </motion.div>

            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-300 rounded-full"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 10}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </motion.div>
    );
};

export default NotFound;