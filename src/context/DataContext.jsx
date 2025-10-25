
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNotification } from "./NotificationProvider";


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]);
    const [parts, setParts] = useState([]);
    const [universalParts, setUniversalParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showNotification } = useNotification();

    // Initialize cart from localStorage
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch (err) {
            console.error("Failed to parse cart from localStorage", err);
            return [];
        }
    });

    // Sync cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Fetch Google Sheets data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vehiclesRes, partsRes, universalPartsRes] = await Promise.all([
                    fetch(
                        "https://sheets.googleapis.com/v4/spreadsheets/1Ok_Aos0Ca6bsr_uBCUH04ppRfO6MhlBfrjCrMzAa4nE/values/Vehicles?key=AIzaSyA_UmBbpJ6SkUBsdMpGbvCP8jnfQ6QRao0"
                    ).then((res) => res.json()),
                    fetch(
                        "https://sheets.googleapis.com/v4/spreadsheets/1Ok_Aos0Ca6bsr_uBCUH04ppRfO6MhlBfrjCrMzAa4nE/values/Parts?key=AIzaSyA_UmBbpJ6SkUBsdMpGbvCP8jnfQ6QRao0"
                    ).then((res) => res.json()),
                    fetch(
                        "https://sheets.googleapis.com/v4/spreadsheets/1Ok_Aos0Ca6bsr_uBCUH04ppRfO6MhlBfrjCrMzAa4nE/values/UniversalParts?key=AIzaSyA_UmBbpJ6SkUBsdMpGbvCP8jnfQ6QRao0"
                    ).then((res) => res.json()),
                ]);

                setVehicles(vehiclesRes.values || []);
                setParts(partsRes.values || []);
                setUniversalParts(universalPartsRes.values || []);
            } catch (error) {
                console.error("Error fetching Google Sheets data:", error);
                showNotification("Failed to load data from Google Sheets", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- 🛒 CART LOGIC ---

    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find(
                (p) => p.id === item.id && p.type === item.type
            );
            if (exists) {
                return prev.map((p) =>
                    p.id === item.id && p.type === item.type
                        ? { ...p, qty: p.qty + 1 }
                        : p
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });

        showNotification(`${item.name} added to cart`, "success");

    };


    const updateQuantity = (id, type, qty) => {
        if (qty <= 0) {
            removeFromCart(id, type);
            return;
        }
        setCart((prev) =>
            prev.map((item) =>
                item.id === id && item.type === type ? { ...item, qty } : item
            )
        );
    };

    const removeFromCart = (id, type) => {
        const removedItem = cart.find((item) => item.id === id && item.type === type);
        if (removedItem) showNotification(`${removedItem.name} removed from cart`, "info");

        setCart((prev) => prev.filter((item) => !(item.id === id && item.type === type)));
    };


    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        showNotification("Cart cleared", "info");

    };

    const checkout = () => {
        setCart([]);
        localStorage.removeItem("cart");
        showNotification("Order placed successfully!", "success");

    };

    return (
        <DataContext.Provider
            value={{
                vehicles,
                parts,
                universalParts,
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                checkout,
                loading,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
