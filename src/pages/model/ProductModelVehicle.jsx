// src/pages/model/ProductModelVehicle.js
import React, { useEffect } from "react";
import { X, ShoppingCart, Plus, Minus } from "lucide-react";

const PartModal = ({
    part,
    isOpen,
    onClose,
    cartItem,
    addToCart,
    updateQuantity,
    removeFromCart,
}) => {
    if (!isOpen || !part) return null;

    const [partId, , typeFromSheet, name, desc, price, imageURL] = part;

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart({
            id: partId,
            type: typeFromSheet,
            name,
            price: Number(price),
            image: imageURL,
            desc,
        });
    };

    const handleMinus = (e) => {
        e.stopPropagation();
        if (cartItem.qty === 1) removeFromCart(partId, typeFromSheet);
        else updateQuantity(partId, typeFromSheet, cartItem.qty - 1);
    };

    const handlePlus = (e) => {
        e.stopPropagation();
        updateQuantity(partId, typeFromSheet, cartItem.qty + 1);
    };

    // Close on Esc key
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg w-full max-w-md overflow-hidden relative shadow-lg transform transition-transform duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Image */}
                <div className="w-full aspect-square bg-gray-50 flex items-center justify-center p-3">
                    <img
                        src={imageURL || "/api/placeholder/300/200"}
                        alt={name}
                        className="w-full h-full object-contain transition-transform duration-200 hover:scale-105"
                        onError={(e) => (e.target.src = "/api/placeholder/300/200")}
                    />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                    {/* Title & Description */}
                    <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
                    <p className="text-xs text-gray-500">{desc}</p>

                    {/* Price */}
                    <p className="text-xl font-bold text-gray-900 mt-2">
                        ₹{Number(price).toLocaleString()}
                    </p>

                    {/* Quantity / Add to Cart */}
                    {cartItem ? (
                        <div className="flex items-center gap-4 mt-4 bg-gray-50 rounded-lg p-2 justify-center">
                            <button
                                onClick={handleMinus}
                                className="w-10 h-10 flex items-center justify-center bg-white border rounded-lg hover:bg-gray-100 transition"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-lg font-semibold text-blue-600">
                                {cartItem.qty}
                            </span>
                            <button
                                onClick={handlePlus}
                                className="w-10 h-10 flex items-center justify-center bg-white border rounded-lg hover:bg-gray-100 transition"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAdd}
                            className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition"
                        >
                            <ShoppingCart size={16} /> Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PartModal;
