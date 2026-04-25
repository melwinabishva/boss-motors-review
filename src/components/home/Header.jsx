import React, { useContext } from "react";
import { ShoppingCart, LayoutGrid, Home, Phone, Package } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/BM_logo_header.jpg";
import { DataContext } from "../../context/DataContext";

const Header = () => {
    const { cart } = useContext(DataContext);

    // Calculate total cart items
    const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

    return (

        <header id="main-header" className="bg-white shadow-md sticky top-0 z-50">
       
            <div className="flex items-center justify-between px-4 py-3 md:hidden">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    BOSS MOTORS
                </Link>
                <Link
                    to="/contact"
                    className="text-blue-600 p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <Phone size={20} />
                </Link>
            </div>

        
            <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
                <Link
                    to="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-wide hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105"
                >
                    BOSS MOTORS
                </Link>

                <nav className="flex items-center gap-8 text-gray-700 font-medium relative">
                    <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
                        <Home size={18} /> Home
                    </Link>

                    <Link to="/vehicle" className="hover:text-blue-600 flex items-center gap-1">
                        <LayoutGrid size={18} /> Vehicles
                    </Link>

                    <Link to="/parts" className="hover:text-blue-600 flex items-center gap-1">
                        <Package size={18} /> Parts
                    </Link>

                  
                    <div className="relative">
                        <Link to="/cart" className="hover:text-blue-600 flex items-center gap-1">
                            <ShoppingCart size={18} /> Cart
                        </Link>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-md">
                                {totalItems}
                            </span>
                        )}
                    </div>

                    <Link
                        to="/contact"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <Phone size={18} /> <span>Contact</span>
                    </Link>
                </nav>
            </div>
        </header>

    );
};

export default Header;
