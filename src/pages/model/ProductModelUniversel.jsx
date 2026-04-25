import React, { useContext } from "react";
import { X, ShoppingCart, Plus, Minus, Tag, Package } from "lucide-react";
import { DataContext } from "../../context/DataContext";

const PartDetailModal = ({ part, isOpen, onClose }) => {
    const { cart, addToCart, updateQuantity, removeFromCart } = useContext(DataContext);

    if (!isOpen || !part) return null;

    const type = part[2] || "universal";
    const cartItem = cart.find(c => c.id === part[0] && c.type === type);

    const handleAddToCart = () => {
        console.log("MODSL DATA 👉", part);
        addToCart({
            id: part[0],

    name: part[3],   // 🔥 REAL product name
    type: part[2],   // category
    brand: part[1],  // 🔥 brand
    desc: part[4],

    price: Number(part[5]),
    image: part[6],
        isUniversal: true   // 🔥 MUST
        });
    };

    const handleQuantityDecrease = () => {
        if (cartItem.qty === 1) {
            removeFromCart(part[0], type);
        } else {
            updateQuantity(part[0], type, cartItem.qty - 1);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl w-full max-w-md shadow-2xl flex flex-col max-h-[95vh] md:h-[85vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start p-3 md:p-4 border-b border-gray-100 flex-shrink-0">
                    <div className="flex-1 min-w-0 pr-2">
                        <h2 className="text-base md:text-lg font-bold text-gray-900 truncate">{part[1]}</h2>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{part[4]}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X size={18} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                    {/* Image */}
                    <div className="aspect-square max-h-48 md:max-h-60 bg-gray-50 rounded-xl overflow-hidden shadow-sm mx-auto">
                        <img
                            src={part[6] || "/api/placeholder/300/300"}
                            alt={part[1]}
                            className="w-full h-full object-contain bg-white p-2 transition-transform duration-500"
                            onError={(e) => (e.target.src = "/api/placeholder/300/300")}
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 text-xs">
                        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                            <Package size={14} className="text-blue-600" />
                            <span className="text-blue-700 capitalize">{type}</span>
                        </div>
                        {part[3] && (
                            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                                <Tag size={14} className="text-green-600" />
                                <span className="text-green-700">{part[3]}</span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {part[4] && (
                        <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-700 leading-relaxed">
                            {part[4]}
                        </div>
                    )}

                    {/* Price */}
                    <div className="text-lg md:text-xl font-bold text-gray-900">
                        ₹{Number(part[5]).toLocaleString()}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 p-3 md:p-4 border-t border-gray-100 bg-white">
                    {cartItem ? (
                        <div className="flex items-center justify-between gap-3">
                            <button
                                onClick={handleQuantityDecrease}
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all"
                            >
                                <Minus size={18} className="text-gray-700" />
                            </button>

                            <div className="flex-1 text-center">
                                <div className="text-xs md:text-sm text-gray-600">Quantity in cart</div>
                                <div className="text-lg md:text-2xl font-bold text-blue-600">{cartItem.qty}</div>
                            </div>

                            <button
                                onClick={() => updateQuantity(part[0], type, cartItem.qty + 1)}
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all"
                            >
                                <Plus size={18} className="text-gray-700" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 md:gap-3 transition-all duration-200 hover:shadow-lg active:scale-95"
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>


    );
};

export default PartDetailModal;