// src/components/home/Footer.jsx
import React, { useContext } from "react";
import { Home, LayoutGrid, ShoppingCart, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
    const { cart } = useContext(DataContext);
    const location = useLocation();

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const isActive = (path) =>
        location.pathname === path ? "text-blue-600" : "text-gray-600";

    return (
        <>
          
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md md:hidden">
                <div className="flex justify-around py-2 relative">
                    <Link to="/" className={`flex flex-col items-center ${isActive("/")}`}>
                        <Home size={22} />
                        <span className="text-xs mt-1">Home</span>
                    </Link>
                    <Link to="/vehicle" className={`flex flex-col items-center ${isActive("/vehicle")}`}>
                        <LayoutGrid size={22} />
                        <span className="text-xs mt-1">Vehicles</span>
                    </Link>
                    <Link to="/parts" className={`flex flex-col items-center ${isActive("/parts")}`}>
                        <Package size={22} />
                        <span className="text-xs mt-1">Parts</span>
                    </Link>

             
                    <div className="relative">
                        <Link to="/cart" className={`flex flex-col items-center ${isActive("/cart")}`}>
                            <ShoppingCart size={22} />
                            <span className="text-xs mt-1">Cart</span>
                        </Link>

                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-md"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

        
            <footer className="hidden md:block bg-gray-900 text-gray-300 py-10 mt-10">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h4 className="text-lg font-semibold text-white mb-2">Boss Motors</h4>
                        <p className="text-sm">
                            Your trusted source for quality vehicles and spare parts.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h4 className="text-lg font-semibold text-white mb-2">Contact</h4>
                        <p className="text-sm">Email: <a href="mailto:Bossmotors1022@gmail.com" className="hover:text-blue-500">Bossmotors1022@gmail.com</a></p>
                        <p className="text-sm">Phone: <a href="tel:8610406798" className="hover:text-blue-500">8610406798</a> / <a href="tel:8508520806" className="hover:text-blue-500">8508520806</a></p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h4 className="text-lg font-semibold text-white mb-2">Address</h4>
                        <p className="text-sm">
                            84/4, M.N PATTY, ABIBRAMINAGAR, Dindigul, 624001
                        </p>
                        <a
                            href="https://maps.app.goo.gl/jSFLJcKajnejtgkDA?g_st=ipc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm mt-1 inline-block"
                        >
                            View on Map
                        </a>
                    </motion.div>
                </div>

                <div className="text-center text-xs text-gray-500 mt-8">
                    © {new Date().getFullYear()} Boss Motors. All rights reserved.
                </div>
            </footer>
        </>
    );
};

export default Footer;
