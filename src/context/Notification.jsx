import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Notification = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 1000); // each notification shows 1s
        return () => clearTimeout(timer);
    }, [onClose]);

    const colors = {
        success: "bg-green-500 text-white",
        info: "bg-blue-500 text-white",
        error: "bg-red-500 text-white",
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
            className={`relative p-4 rounded-lg shadow-lg ${colors[type]} overflow-hidden`}
            whileHover={{ scale: 1.02 }}
        >
            <p className="text-sm">{message}</p>
            <button
                onClick={onClose}
                className="absolute top-1 right-1 p-1 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors"
            >
                <X size={14} />
            </button>
            <motion.div
                className={`absolute bottom-0 left-0 h-1 ${type === "success" ? "bg-white" : type === "error" ? "bg-white/80" : "bg-white/70"}`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 1, ease: "linear" }}
            />
        </motion.div>
    );
};

export default Notification;
