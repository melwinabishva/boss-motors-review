import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { ShoppingCart, Plus, Minus, Eye, Heart } from "lucide-react";
import UniversalModal from "../model/ProductModelUniversel";

const PartCard = ({ part, viewMode }) => {
    const { cart, addToCart, removeFromCart, updateQuantity } = useContext(DataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [justAddedId, setJustAddedId] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const [partId, name, typeFromSheet, productName, desc, price, imageURL] = part;
    const cartItem = cart.find(c => c.id === partId && c.type === typeFromSheet);
    const isJustAdded = justAddedId === partId;

    const handleAddToCart = (e) => {
        e?.stopPropagation();
        console.log("PART DATA 👉", part);
        addToCart({
        id: part[0],

    name: part[3],   // 🔥 REAL product name
    type: part[2],   // category
    brand: part[1],  // 🔥 brand
    desc: part[4],

    price: Number(part[5]),
    image: part[6],
        isUniversal: true      // 🔥 MUST
    });

        setJustAddedId(part[0]);
        setTimeout(() => setJustAddedId(null), 1200);
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

    const handleImageError = () => setImageError(true);



    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className={`group bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden w-full
        ${viewMode === "grid"
                        ? "flex flex-col h-full hover:shadow-lg hover:-translate-y-1"
                        : "flex flex-row gap-4 hover:shadow-md"
                    }`}
            >

                {/* Image Section */}
                <div
                    className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 
            ${viewMode === "grid"
                            ? "h-40 sm:h-44 md:h-48"
                            : "w-28 sm:w-32 h-28 sm:h-32 flex-shrink-0 self-center m-3 rounded-xl"
                        }`}
                >
                    {/* Loading Skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-md" />
                    )}

                    {/* Product Image (items catagory) */}
                    <img
                        src={imageError ? "/api/placeholder/300/200" : imageURL}
                        alt={name}
                        onLoad={() => setImageLoaded(true)}
                        onError={handleImageError}
                        className={`w-full h-full object-contain bg-white p-2 transition-transform duration-500
              ${imageLoaded ? "opacity-100" : "opacity-0"}
              ${viewMode === "grid" ? "group-hover:scale-105" : ""}
            `}
                    />



                    {/* Added to Cart Overlay */}
                    {isJustAdded && (
                        <div className="absolute inset-0 bg-emerald-500/90 flex items-center justify-center backdrop-blur-sm">
                            <div className="text-center text-white">
                                <div className="w-9 h-9 border-2 border-white rounded-full flex items-center justify-center mx-auto mb-1 animate-bounce">
                                    ✓
                                </div>
                                <p className="text-xs font-medium">Added!</p>
                            </div>
                        </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-2 left-2 bg-white/90 text-gray-700 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                        {typeFromSheet}
                    </div>
                </div>

                {/* Content Section */}
                <div className={`flex-1 flex flex-col ${viewMode === "list" ? "py-2 pr-3" : "p-3 sm:p-4"}`}>
                    {/* Title */}
                    <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight line-clamp-2 flex-1">
                            {name}
                        </h3>
                        {viewMode === "grid" && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModalOpen(true);
                                }}
                                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-200"
                            >
                                <Eye size={13} />
                            </button>
                        )}
                    </div>
                    <div><h2 className="text-m text-gray-500 font-medium">{productName}</h2></div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2 sm:mb-3">
                        {desc}
                    </p>

                    {/* Price & Action */}
                    <div
                        className={`mt-auto pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 ${viewMode === "list" ? "sm:items-end" : ""
                            }`}
                    >
                        <div>
                            <p className="font-bold text-blue-600 text-sm sm:text-lg">
                                ₹{Number(price || 0).toLocaleString()}
                            </p>
                            {Number(price) > 10000 && (
                                <p className="text-[10px] sm:text-xs text-gray-500">EMI available</p>
                            )}
                        </div>

                        {/* Cart Actions */}
                        <div className="flex justify-end w-full sm:w-auto sm:self-end">
                            {cartItem ? (
                                <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1.5">
                                    <button
                                        onClick={(e) => handleQuantityChange(-1, e)}
                                        className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"
                                    >
                                        <Minus size={12} className="text-gray-600" />
                                    </button>
                                    <span className="text-gray-900 font-semibold text-xs sm:text-sm">{cartItem.qty}</span>
                                    <button
                                        onClick={(e) => handleQuantityChange(1, e)}
                                        className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 rounded-full flex items-center justify-center shadow-sm hover:bg-blue-200"
                                    >
                                        <Plus size={12} className="text-blue-600" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    <ShoppingCart size={14} />
                                    <span>Add</span>
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
