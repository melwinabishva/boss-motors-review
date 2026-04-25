import React, { useRef, useContext, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, Sparkles, Clock } from "lucide-react";
import { DataContext } from "../../context/DataContext";
import PartModal from "../../pages/model/ProductModelVehicle";
import Vehicle from "../../pages/Vechile";

const NewArrival = () => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const { parts, loading, cart, addToCart, updateQuantity, removeFromCart } = useContext(DataContext);
    const [selectedPart, setSelectedPart] = useState(null);
    const [isScrolling, setIsScrolling] = useState(false);

    if (loading || parts.length <= 1) return null;

    const lastParts = parts.slice(1).slice(-20);

    const updateArrowVisibility = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        updateArrowVisibility();
        window.addEventListener('resize', updateArrowVisibility);
        return () => window.removeEventListener('resize', updateArrowVisibility);
    }, [lastParts]);

    const scroll = (direction) => {
        if (scrollRef.current && !isScrolling) {
            setIsScrolling(true);
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });

            setTimeout(() => {
                setIsScrolling(false);
                updateArrowVisibility();
            }, 400);
        }
    };

    const getCartItem = (id, type) => cart.find((item) => item.id === id && item.type === type);

    const handleScroll = () => {
        updateArrowVisibility();
    };

    return (
        <section className="py-8 md:py-16 px-3 md:px-8 relative max-w-7xl mx-auto">
            <div className="flex flex-row justify-between items-center mb-6 md:mb-8 px-1">
                <div className="flex items-center gap-3">
                    <div className="hidden xs:block">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg">
                            <Sparkles className="text-white" size={20} />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col xs:flex-row xs:items-center xs:gap-3">
                            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent leading-tight">
                                New Arrivals
                            </h2>
                            <p className="text-gray-600 text-sm md:text-lg flex items-center gap-1 md:gap-2 mt-1 xs:mt-0">
                                <Clock size={14} className="text-purple-500 flex-shrink-0" />
                                <span className="truncate">New auto parts</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative group">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll("left")}
                        disabled={isScrolling}
                        className="absolute -left-2 md:-left-6 top-1/2 transform -translate-y-1/2 z-20 
                         bg-white/95 backdrop-blur-md p-2 md:p-4 rounded-xl md:rounded-2xl 
                         shadow-xl border border-gray-200 hover:bg-white hover:shadow-2xl 
                         transition-all duration-300 active:scale-95 opacity-0 group-hover:opacity-100 
                         hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={18} className="md:hidden text-gray-700" />
                        <ChevronLeft size={26} className="hidden md:block text-gray-700" />
                    </button>
                )}

                {showRightArrow && (
                    <button
                        onClick={() => scroll("right")}
                        disabled={isScrolling}
                        className="absolute -right-2 md:-right-6 top-1/2 transform -translate-y-1/2 z-20 
                         bg-white/95 backdrop-blur-md p-2 md:p-4 rounded-xl md:rounded-2xl 
                         shadow-xl border border-gray-200 hover:bg-white hover:shadow-2xl 
                         transition-all duration-300 active:scale-95 opacity-0 group-hover:opacity-100 
                         hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={18} className="md:hidden text-gray-700" />
                        <ChevronRight size={26} className="hidden md:block text-gray-700" />
                    </button>
                )}

                <div className="mx-1 md:mx-4">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex space-x-4 md:space-x-8 overflow-x-auto scroll-smooth px-3 md:px-6 py-4 md:py-8 -mx-3 md:-mx-6
                         hide-scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                        style={{ scrollbarGutter: 'stable' }}
                    >
                        {lastParts.map((part, index) => {
                            const [partId, vehicleId, type, name, desc, price, imageURL] = part;
                            const cartItem = getCartItem(partId, type);

                            return (
                                <div
                                    key={`${type}-${partId}`}
                                    onClick={() => setSelectedPart(part)}
                                    className="flex-none w-64 md:w-80 bg-white rounded-2xl md:rounded-3xl shadow-md 
                                     hover:shadow-xl transition-all duration-400 border border-gray-100 
                                     hover:border-purple-200 group flex flex-col transform hover:-translate-y-1 md:hover:-translate-y-2 
                                     cursor-pointer overflow-hidden animate-fade-in"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <div className="relative overflow-hidden rounded-t-2xl md:rounded-t-3xl bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                                        <img
                                            src={imageURL || "/api/placeholder/300/200"}
                                            alt={name}
                                            className="w-full h-40 md:h-56 object-cover group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-600 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                        <div className="absolute top-2 md:top-4 left-2 md:left-4">
                                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 md:px-3 md:py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                                                NEW
                                            </span>
                                        </div>

                                        {!cartItem && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart({
                                                        id: partId,
                                                        type,
                                                        name,
                                                        price: Number(price),
                                                        image: imageURL,
                                                        desc,
                                                        Vehicle: vehicleId, 
                                                    });
                                                }}
                                                className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/90 backdrop-blur-sm 
                                                         p-2 md:p-3 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 
                                                         transform translate-y-1 group-hover:translate-y-0 
                                                         transition-all duration-300 hover:scale-105 hover:bg-white 
                                                         shadow-md hover:shadow-lg border border-gray-200"
                                            >
                                                <ShoppingCart size={14} className="md:hidden text-gray-700" />
                                                <ShoppingCart size={18} className="hidden md:block text-gray-700" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="p-3 md:p-6 flex-1 flex flex-col">
                                        <div className="mb-3 md:mb-4 flex-1">
                                            <h3 className="font-bold text-gray-900 text-base md:text-lg line-clamp-2 mb-2 leading-tight group-hover:text-purple-700 transition-colors">
                                                {name}
                                            </h3>
                                            <p className="text-gray-600 text-xs md:text-sm line-clamp-2 leading-relaxed mb-3">
                                                {desc}
                                            </p>
                                        </div>

                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-xl md:text-2xl font-bold text-gray-900">₹{price}</span>
                                                </div>
                                                {cartItem && (
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                                        <ShoppingCart size={10} className="md:hidden" />
                                                        <ShoppingCart size={12} className="hidden md:block" />
                                                        <span className="hidden xs:inline">In Cart •</span>
                                                        <span>{cartItem.qty}</span>
                                                    </span>
                                                )}
                                            </div>

                                            {cartItem ? (
                                                <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl md:rounded-2xl p-2 md:p-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (cartItem.qty === 1) removeFromCart(partId, type);
                                                            else updateQuantity(partId, type, cartItem.qty - 1);
                                                        }}
                                                        className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm hover:bg-gray-100 
                                                                 hover:shadow-md transition-all duration-200 active:scale-95 
                                                                 flex items-center justify-center border border-gray-200"
                                                    >
                                                        <Minus size={14} className="md:hidden text-gray-700" />
                                                        <Minus size={18} className="hidden md:block text-gray-700" />
                                                    </button>

                                                    <span className="font-bold text-gray-900 min-w-8 text-center text-base md:text-lg">
                                                        {cartItem.qty}
                                                    </span>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateQuantity(partId, type, cartItem.qty + 1);
                                                        }}
                                                        className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm hover:bg-gray-100 
                                                                 hover:shadow-md transition-all duration-200 active:scale-95 
                                                                 flex items-center justify-center border border-gray-200"
                                                    >
                                                        <Plus size={14} className="md:hidden text-gray-700" />
                                                        <Plus size={18} className="hidden md:block text-gray-700" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart({
                                                            id: partId,
                                                            type,
                                                            name,
                                                            price: Number(price),
                                                            image: imageURL,
                                                            desc,
                                                        });
                                                    }}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                                                             text-white py-2.5 md:py-4 rounded-xl md:rounded-2xl hover:from-blue-700 hover:to-purple-700 
                                                             transition-all duration-300 shadow-lg hover:shadow-xl 
                                                             active:scale-[0.98] font-medium md:font-semibold flex items-center justify-center gap-2 md:gap-3
                                                             group/btn overflow-hidden relative text-sm md:text-base"
                                                >
                                                    <span className="relative z-10 flex items-center gap-1 md:gap-2">
                                                        <ShoppingCart size={16} className="md:hidden transition-transform group-hover/btn:scale-110" />
                                                        <ShoppingCart size={20} className="hidden md:block transition-transform group-hover/btn:scale-110" />
                                                        Add to Cart
                                                    </span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center mt-4 md:mt-8 space-x-1 md:space-x-2">
                    {[1, 2, 3].map((dot) => (
                        <div
                            key={dot}
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-300 transition-all duration-300 hover:bg-gray-400 cursor-pointer hover:scale-125"
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