import React, { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Check } from "lucide-react";

const PartCard = ({
    part,
    viewMode,
    cartItem,
    isJustAdded,
    handleAddToCart,
    updateQuantity,
    removeFromCart,
    onClick,
}) => {
    const [partId, , typeFromSheet, name, desc, price, imageURL] = part;
    const [isAdding, setIsAdding] = useState(false);

    const handleAddClick = (e) => {
        e.stopPropagation();
        setIsAdding(true);
        handleAddToCart({
            id: partId,
            type: typeFromSheet,
            name,
            price: Number(price),
            image: imageURL,
            desc
        });
        setTimeout(() => setIsAdding(false), 1500);
    };

    const handleQuantityChange = (e, change) => {
        e.stopPropagation();
        const newQty = cartItem.qty + change;
        if (newQty <= 0) {
            removeFromCart(partId, typeFromSheet);
        } else {
            updateQuantity(partId, typeFromSheet, newQty);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        removeFromCart(partId, typeFromSheet);
    };

    // Base card style
    const cardBaseClasses = `
        group cursor-pointer transition-all duration-300 
        bg-white border border-gray-200/80
        hover:border-blue-300/50 hover:shadow-lg
        ${isJustAdded ? "ring-2 ring-green-500/30 ring-opacity-50" : ""}
    `;

    // Layout for grid vs list
    const layoutClasses = viewMode === "list"
        ? "flex flex-row items-start gap-3 p-3 sm:p-4 rounded-xl"
        : "flex flex-col justify-between h-full p-4 rounded-xl";

    // Image container
    const imageContainerClasses = viewMode === "list"
        ? "w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100/50"
        : "relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100/50 mb-3";

    // Content area
    const contentClasses = viewMode === "list"
        ? "flex-1 min-w-0 flex flex-col justify-between"
        : "flex-1 flex flex-col";

    return (
        <div
            onClick={onClick}
            className={`${cardBaseClasses} ${layoutClasses} ${viewMode === "list" ? "min-h-[140px]" : "min-h-[280px] sm:min-h-[320px]"}`}
        >

            {/* Image Section */}
            <div className={`${imageContainerClasses} relative`}>
                <img
                    src={imageURL || "/api/placeholder/300/300"}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {isJustAdded && (
                    <div className="absolute inset-0 bg-green-500/90 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm animate-pulse">
                        <Check size={20} className="text-white mb-1" />
                        <p className="text-white text-xs font-semibold">Added!</p>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className={contentClasses}>
                <div>
                    <h3 className="text-gray-900 font-semibold text-sm sm:text-base line-clamp-2">{name}</h3>
                    {viewMode !== "list" && (
                        <p className="text-gray-600 text-xs line-clamp-2 mt-1 mb-2">{desc}</p>
                    )}
                    <p className="text-blue-600 font-bold text-sm sm:text-lg mt-1">{`₹${Number(price).toLocaleString()}`}</p>
                </div>

                {/* Actions Section */}
                <div
                    className={`mt-auto flex w-full items-center ${viewMode === "list"
                        ? "justify-end sm:justify-between pt-2 border-t border-gray-100 mt-2"
                        : "justify-center pt-2"
                        }`}
                >
                    {cartItem ? (
                        <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1.5 shadow-sm">
                            <button
                                onClick={(e) => handleQuantityChange(e, -1)}
                                className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50 transition-all"
                            >
                                <Minus size={12} className="text-gray-600" />
                            </button>
                            <span className="text-gray-900 font-semibold text-sm min-w-[24px] text-center">
                                {cartItem.qty}
                            </span>
                            <button
                                onClick={(e) => handleQuantityChange(e, 1)}
                                className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center shadow hover:bg-blue-200 transition-all"
                            >
                                <Plus size={12} className="text-blue-600" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddClick}
                            className={`flex items-center justify-center gap-2 text-white font-semibold py-1.5 sm:py-2 px-4 rounded-lg shadow hover:shadow-md transition-all
                                ${viewMode === "list"
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 ml-auto"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto"
                                }`}
                        >
                            <ShoppingCart size={16} />
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PartCard;
