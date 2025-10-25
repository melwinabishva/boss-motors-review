
import React, { useEffect, useState } from "react";
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
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);


    const [partId, , typeFromSheet, name, desc, price, imageURL] = part || [];
    if (!isOpen || !part) return null;

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
        const qty = cartItem?.qty ?? 0;
        qty <= 1
            ? removeFromCart(partId, typeFromSheet)
            : updateQuantity(partId, typeFromSheet, qty - 1);
    };

    const handlePlus = (e) => {
        e.stopPropagation();
        const qty = cartItem?.qty ?? 0;
        updateQuantity(partId, typeFromSheet, qty + 1);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl w-full max-w-md sm:max-w-lg overflow-hidden relative shadow-2xl transform transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-white rounded-full shadow p-1 hover:bg-gray-100 transition"
                >
                    <X size={18} className="text-gray-700" />
                </button>


                <div className="w-full bg-gray-50 flex items-center justify-center p-3 min-h-[220px] sm:min-h-[280px]">
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                        </div>
                    )}
                    <img
                        src={imageURL || "/api/placeholder/300/200"}
                        alt={name}
                        className={`max-h-[240px] object-contain transition-all duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                            e.target.src = "/api/placeholder/300/200";
                            setImageLoaded(true);
                        }}
                    />
                </div>


                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {typeFromSheet}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            In Stock
                        </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{name}</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>

                    <p className="text-2xl font-bold text-gray-900">₹{Number(price).toLocaleString()}</p>


                    {cartItem ? (
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleMinus}
                                        className="w-9 h-9 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                                    >
                                        <Minus size={14} className="text-gray-600" />
                                    </button>
                                    <span className="text-base font-semibold text-blue-600">
                                        {cartItem.qty}
                                    </span>
                                    <button
                                        onClick={handlePlus}
                                        className="w-9 h-9 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                                    >
                                        <Plus size={14} className="text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(partId, typeFromSheet)}
                                className="w-full py-2.5 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition"
                            >
                                Remove from Cart
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAdd}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
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
