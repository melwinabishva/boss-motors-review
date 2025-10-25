import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { ShoppingCart, Plus, Minus, Eye, Heart, Share2, Star } from "lucide-react";
import UniversalModal from "../model/ProductModelUniversel";

const PartCard = ({ part, viewMode }) => {
    const { cart, addToCart, removeFromCart, updateQuantity } = useContext(DataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [justAddedId, setJustAddedId] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageError, setImageError] = useState(false);

    const [partId, , typeFromSheet, name, desc, price, imageURL] = part;
    const cartItem = cart.find(c => c.id === partId && c.type === typeFromSheet);
    const isJustAdded = justAddedId === partId;

    // Mock rating for demonstration
    const rating = 4.5;
    const reviews = 24;

    const handleAddToCart = (e) => {
        e?.stopPropagation();
        addToCart({ id: partId, type: typeFromSheet, name, price: Number(price), image: imageURL, desc });
        setJustAddedId(partId);
        setTimeout(() => setJustAddedId(null), 1500);
    };

    const handleQuantityChange = (change, e) => {
        e?.stopPropagation();
        const newQty = cartItem.qty + change;
        if (newQty <= 0) {
            removeFromCart(partId, typeFromSheet);
        } else {
            updateQuantity(partId, typeFromSheet, newQty);
        }
    };

    const toggleWishlist = (e) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <>
            <div
                className={`group bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden
                    ${viewMode === "grid"
                        ? "flex flex-col h-full hover:shadow-xl hover:-translate-y-1"
                        : "flex flex-row gap-4 w-full hover:shadow-md"
                    }`}
                onClick={() => setIsModalOpen(true)}
            >
                {/* Image Section */}
                <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 
                    ${viewMode === "grid" ? "h-48" : "w-32 h-32 flex-shrink-0 self-center m-3 rounded-xl"}`}
                >
                    {/* Loading Skeleton */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse ${imageLoaded ? "hidden" : "block"}`} />

                    {/* Product Image */}
                    <img
                        src={imageError ? "/api/placeholder/300/200" : imageURL}
                        alt={name}
                        onLoad={() => setImageLoaded(true)}
                        onError={handleImageError}
                        className={`w-full h-full object-cover transition-all duration-500 
                            ${viewMode === "grid" ? "group-hover:scale-105" : ""} 
                            ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    />

                    {/* Success Overlay */}
                    {isJustAdded && (
                        <div className="absolute inset-0 bg-emerald-500/90 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
                            <div className="text-center text-white">
                                <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                                    ✓
                                </div>
                                <p className="text-sm font-semibold">Added to Cart!</p>
                            </div>
                        </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                            {typeFromSheet}
                        </span>

                    </div>


                </div>

                {/* Content Section */}
                <div className={`flex-1 flex flex-col ${viewMode === "list" ? "py-3 pr-4" : "p-5"}`}>
                    {/* Product Info */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2 flex-1">
                                {name}
                            </h3>
                            {viewMode === "grid" && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsModalOpen(true);
                                    }}
                                    className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                                >
                                    <Eye size={14} />
                                </button>
                            )}
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                            {desc}
                        </p>


                    </div>

                    {/* Price & Actions */}
                    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100 mt-auto`}>
                        <div className="flex flex-col">
                            <p className="font-bold text-blue-600 text-lg">
                                ₹{Number(price).toLocaleString()}
                            </p>
                            {Number(price) > 10000 && (
                                <p className="text-xs text-gray-500">
                                    EMI available
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end sm:justify-end w-full sm:w-auto">
                            {cartItem ? (
                                <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => handleQuantityChange(-1, e)}
                                            className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 hover:shadow transition-all duration-200"
                                        >
                                            <Minus size={12} className="text-gray-600" />
                                        </button>
                                        <span className="text-gray-900 font-bold text-sm min-w-6 text-center">
                                            {cartItem.qty}
                                        </span>
                                        <button
                                            onClick={(e) => handleQuantityChange(1, e)}
                                            className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center shadow-sm hover:bg-blue-200 hover:shadow transition-all duration-200"
                                        >
                                            <Plus size={12} className="text-blue-600" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromCart(partId, typeFromSheet);
                                        }}
                                        className="text-red-500 text-xs font-medium hover:text-red-700 transition-colors duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 px-5 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <ShoppingCart size={16} className="transition-transform duration-300" />
                                    <span>Add to Cart</span>
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal */}
            <UniversalModal
                part={part}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cartItem={cartItem}
                addToCart={handleAddToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />
        </>
    );
};

export default PartCard;