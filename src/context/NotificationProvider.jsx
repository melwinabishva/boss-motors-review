import React, { createContext, useState, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, type = "success") => {
        const id = Date.now() + Math.random();
        setNotifications(prev => [...prev, { id, message, type }]);
    };

    const removeNotification = id => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="fixed top-16 right-4 z-50 flex flex-col gap-3 max-w-xs w-full">
                <AnimatePresence initial={false}>
                    {notifications.map((n, index) => (
                        <Notification
                            key={n.id}
                            message={n.message}
                            type={n.type}
                            onClose={() => removeNotification(n.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};
