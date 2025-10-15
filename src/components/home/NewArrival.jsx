import React, { useRef, useContext, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, Sparkles, Zap } from "lucide-react";
import { DataContext } from "../../context/DataContext";
import PartModal from "../../pages/model/ProductModelVehicle";
const NewArrival = () => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const { parts, loading, cart, addToCart, updateQuantity, removeFromCart } = useContext(DataContext);
    const [selectedPart, setSelectedPart] = useState(null);

    if (loading || parts.length <= 1) return null;

    const lastParts = parts.slice(1).slice(-20);

    const updateArrowVisibility = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        updateArrowVisibility();
        window.addEventListener('resize', updateArrowVisibility);
        return () => window.removeEventListener('resize', updateArrowVisibility);
    }, [lastParts]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });

            // Update arrow visibility after scroll
            setTimeout(updateArrowVisibility, 300);
        }
    };

    const getCartItem = (id, type) => cart.find((item) => item.id === id && item.type === type);

    const handleScroll = () => {
        updateArrowVisibility();
    };

    return (
        <section className="py-12 px-4 md:px-8 relative max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 px-2">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                        <Sparkles className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">New Arrivals</h2>
                        <p className="text-gray-500 text-sm mt-1">Newly added auto parts for your vehicle</p>
                    </div>
                </div>


            </div>

            {/* Scroll Container */}
            <div className="relative group">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-4 md:-left-6 top-1/2 transform -translate-y-1/2 z-20 
                         bg-white p-3 rounded-full shadow-2xl border border-gray-200 
                         hover:bg-gray-50 hover:shadow-2xl transition-all duration-200 
                         active:scale-95 opacity-0 group-hover:opacity-100 hover:opacity-100
                         backdrop-blur-sm"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} className="text-gray-700" />
                    </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-4 md:-right-6 top-1/2 transform -translate-y-1/2 z-20 
                         bg-white p-3 rounded-full shadow-2xl border border-gray-200 
                         hover:bg-gray-50 hover:shadow-2xl transition-all duration-200 
                         active:scale-95 opacity-0 group-hover:opacity-100 hover:opacity-100
                         backdrop-blur-sm"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} className="text-gray-700" />
                    </button>
                )}

                {/* Products Grid */}
                <div className="mx-2 md:mx-4">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex space-x-5 md:space-x-6 overflow-x-auto scroll-smooth px-4 py-6 -mx-4
               hide-scrollbar"
                    >
                        {lastParts.map((part, index) => {
                            const [partId, vehicleId, type, name, desc, price, imageURL] = part;
                            const cartItem = getCartItem(partId, type);

                            return (
                                <div
                                    key={`${type}-${partId}`}
                                    onClick={() => setSelectedPart(part)}
                                    className="flex-none w-64 md:w-72 bg-white rounded-2xl shadow-sm 
                                     hover:shadow-2xl transition-all duration-500 border border-gray-100 
                                     hover:border-gray-200 group flex flex-col transform hover:-translate-y-1"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden rounded-t-2xl bg-gray-100">
                                        <img
                                            src={imageURL || "/api/placeholder/300/200"}
                                            alt={name}
                                            className="w-full h-44 md:h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* NEW Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                                NEW ARRIVAL
                                            </span>
                                        </div>

                                        {/* Quick Add Button - Shows on Hover */}
                                        {!cartItem && (
                                            <button
                                                onClick={() =>
                                                    addToCart({
                                                        id: partId,
                                                        type,
                                                        name,
                                                        price: Number(price),
                                                        image: imageURL,
                                                        desc,
                                                    })
                                                }
                                                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm 
                                                         p-2 rounded-full opacity-0 group-hover:opacity-100 
                                                         transform translate-y-2 group-hover:translate-y-0 
                                                         transition-all duration-300 hover:scale-110 hover:bg-white 
                                                         shadow-lg"
                                            >
                                                <ShoppingCart size={16} className="text-gray-700" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-4 flex-1 flex flex-col">
                                        {/* Name and Description */}
                                        <div className="mb-3 flex-1">
                                            <h3 className="font-semibold text-gray-900 text-base line-clamp-2 mb-2 leading-tight">
                                                {name}
                                            </h3>
                                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                                {desc}
                                            </p>
                                        </div>

                                        {/* Price and Actions */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-bold text-gray-900">₹{price}</span>
                                                {cartItem && (
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                        In Cart • {cartItem.qty}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            {cartItem ? (
                                                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2">
                                                    <button
                                                        onClick={() => {
                                                            if (cartItem.qty === 1) removeFromCart(partId, type);
                                                            else updateQuantity(partId, type, cartItem.qty - 1);
                                                        }}
                                                        className="w-8 h-8 bg-white rounded-lg shadow-sm hover:bg-gray-100 
                                                                 hover:shadow-md transition-all duration-200 active:scale-95 
                                                                 flex items-center justify-center"
                                                    >
                                                        <Minus size={16} className="text-gray-700" />
                                                    </button>

                                                    <span className="font-bold text-gray-900 min-w-8 text-center">
                                                        {cartItem.qty}
                                                    </span>

                                                    <button
                                                        onClick={() => updateQuantity(partId, type, cartItem.qty + 1)}
                                                        className="w-8 h-8 bg-white rounded-lg shadow-sm hover:bg-gray-100 
                                                                 hover:shadow-md transition-all duration-200 active:scale-95 
                                                                 flex items-center justify-center"
                                                    >
                                                        <Plus size={16} className="text-gray-700" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        addToCart({
                                                            id: partId,
                                                            type,
                                                            name,
                                                            price: Number(price),
                                                            image: imageURL,
                                                            desc,
                                                        })
                                                    }
                                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                                                             text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 
                                                             transition-all duration-200 shadow-lg hover:shadow-xl 
                                                             active:scale-95 font-medium flex items-center justify-center gap-2"
                                                >
                                                    <ShoppingCart size={18} />
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center mt-6 space-x-1">
                    {[1, 2, 3].map((dot) => (
                        <div
                            key={dot}
                            className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
                        />
                    ))}
                </div>
            </div>
            <PartModal
                part={selectedPart}
                isOpen={!!selectedPart}
                onClose={() => setSelectedPart(null)}
                cartItem={cart.find(
                    (c) => c.id === selectedPart?.[0] && c.type === selectedPart?.[2]
                )}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />

        </section>
    );
};

export default NewArrival;