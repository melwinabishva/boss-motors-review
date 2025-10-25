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

    // Base card classes
    const cardBaseClasses = `
        group cursor-pointer transition-all duration-300 
        bg-white border border-gray-200/80
        hover:border-blue-300/50 hover:shadow-lg
        ${isJustAdded ? "ring-2 ring-green-500/30 ring-opacity-50" : ""}
    `;

    // Layout classes based on view mode
    const layoutClasses = viewMode === "list"
        ? "flex flex-row items-start gap-4 p-4 sm:p-6 rounded-2xl"
        : "flex flex-col h-full p-4 rounded-xl";

    // Image container classes
    const imageContainerClasses = viewMode === "list"
        ? "w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100/50"
        : "relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100/50 mb-3";

    // Content container classes
    const contentClasses = viewMode === "list"
        ? "flex-1 min-w-0 flex flex-col h-full"
        : "flex-1 flex flex-col";

    return (
        <div
            onClick={onClick}
            className={`${cardBaseClasses} ${layoutClasses}`}
        >
            {/* Image Section */}
            <div className={`${imageContainerClasses} relative`}>
                <img
                    src={imageURL || "/api/placeholder/300/300"}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Added to Cart Overlay */}
                {isJustAdded && (
                    <div className="absolute inset-0 bg-green-500/90 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm animate-pulse">
                        <Check size={viewMode === "list" ? 20 : 20} className="text-white mb-1" />
                        <p className="text-white text-xs font-semibold">Added!</p>
                    </div>
                )}
            </div>

            {/* Content Section */}
            {/* Wrap content section in flex-col with mt-auto */}
            <div className={`${contentClasses} flex flex-col`}>
                {/* Header + description */}
                <div className={`flex flex-col mb-3`}>
                    <h3 className="text-gray-900 font-semibold text-sm line-clamp-2 mb-1">{name}</h3>
                    {viewMode !== "list" && (
                        <p className="text-gray-600 text-xs line-clamp-2 mb-2">{desc}</p>
                    )}
                    <p className="text-blue-600 font-bold text-lg">{`₹${Number(price).toLocaleString()}`}</p>
                </div>

                {/* Actions at bottom */}
                <div className="mt-auto flex justify-end w-full">
                    {cartItem ? (
                        <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2">
                            <button
                                onClick={(e) => handleQuantityChange(e, -1)}
                                className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all"
                            >
                                <Minus size={12} className="text-gray-600" />
                            </button>
                            <span className="text-gray-900 font-bold text-sm min-w-6 text-center">{cartItem.qty}</span>
                            <button
                                onClick={(e) => handleQuantityChange(e, 1)}
                                className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center shadow-sm hover:bg-blue-200 transition-all"
                            >
                                <Plus size={12} className="text-blue-600" />
                            </button>
                            <button
                                onClick={handleRemove}
                                className="text-red-500 text-xs font-medium hover:text-red-700 ml-2"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddClick}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow hover:shadow-lg transition-all"
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