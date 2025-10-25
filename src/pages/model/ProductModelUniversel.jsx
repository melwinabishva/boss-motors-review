import React, { useContext } from "react";
import { X, ShoppingCart, Plus, Minus } from "lucide-react";
import { DataContext } from "../../context/DataContext";

const PartDetailModal = ({ part, isOpen, onClose }) => {
    const { cart, addToCart, updateQuantity, removeFromCart } = useContext(DataContext);

    if (!isOpen || !part) return null;

    const type = part[2] || "universal";

    // Get cart item from context to reflect current quantity
    const cartItem = cart.find(c => c.id === part[0] && c.type === type);

    const handleAddToCart = () => {
        addToCart({
            id: part[0],
            type,
            name: part[1],
            price: Number(part[5]),
            image: part[6],
            desc: part[4],
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose} 
        >
            <div
                className="bg-white rounded-lg w-11/12 max-w-md shadow-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-start p-4 border-b border-gray-200">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-gray-900">{part[1]}</h2>
                        <p className="text-xs text-gray-500">{part[4]}</p>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }} 
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 space-y-3">
                    <div className="flex justify-center items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                        <img
                            src={part[6] || "/api/placeholder/300/200"}
                            alt={part[1]}
                            className="max-h-56 w-full object-contain transition-transform duration-200 hover:scale-105"
                            onError={(e) => (e.target.src = "/api/placeholder/300/200")}
                        />
                    </div>

                    <p className="text-xs text-gray-600">{part[4]}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-xs">{part[2]}</span>
                        <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs">{part[3]}</span>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">₹{Number(part[5]).toLocaleString()}</span>
                    </div>

                    {cartItem ? (
                        <div className="flex items-center justify-center gap-4 mt-4 bg-gray-50 rounded-lg p-2">
                            <button
                                onClick={() => {
                                    if (cartItem.qty === 1) removeFromCart(part[0], type);
                                    else updateQuantity(part[0], type, cartItem.qty - 1);
                                }}
                                className="w-10 h-10 flex items-center justify-center bg-white border rounded-lg hover:bg-gray-100 transition"
                            >
                                <Minus size={14} />
                            </button>
                            <span className="font-semibold text-blue-600 text-lg">{cartItem.qty}</span>
                            <button
                                onClick={() => updateQuantity(part[0], type, cartItem.qty + 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white border rounded-lg hover:bg-gray-100 transition"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
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

export default PartDetailModal;
