import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Car, MapPin, Sparkles, Users, Shield, Zap } from "lucide-react";
import { DataContext } from "../../context/DataContext";
import VehicleModal from "../../pages/model/VehicleModal";

const VehicleScroll = () => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const { vehicles, loading } = useContext(DataContext);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);

    if (loading || vehicles.length <= 1) return null;

    const vehicleList = vehicles.slice(1, 11);

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
    }, [vehicleList]);

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

    const handleScroll = () => {
        updateArrowVisibility();
    };


    return (
        <section className="py-8 md:py-16 px-3 md:px-8 relative max-w-7xl mx-auto">
            <div className="flex flex-row justify-between items-center mb-6 md:mb-10 px-1">
                <div className="flex items-center gap-3">
                    <div className="hidden xs:block">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg">
                            <Car className="text-white" size={20} />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col xs:flex-row xs:items-center xs:gap-3">
                            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent leading-tight">
                                Featured Vehicles
                            </h2>
                            <p className="text-gray-600 text-sm md:text-lg flex items-center gap-1 md:gap-2 mt-1 xs:mt-0">
                                <Users size={14} className="text-blue-500 flex-shrink-0" />
                                <span className="truncate">Premium parts</span>
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/vehicle")}
                    className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 
                             text-white font-semibold text-xs md:text-base px-3 md:px-6 py-2 md:py-3 
                             rounded-xl md:rounded-2xl hover:from-blue-700 hover:to-purple-700 
                             transition-all duration-300 shadow-lg hover:shadow-xl 
                             active:scale-95 transform hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0 ml-2"
                >
                    <span className="hidden xs:inline">View All</span>
                    <span className="xs:hidden">All</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
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
                        <ChevronLeft size={24} className="hidden md:block text-gray-700" />
                    </button>
                )}

                <div className="mx-1 md:mx-4">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex space-x-4 md:space-x-8 overflow-x-auto scroll-smooth 
                         scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 
                         px-3 md:px-6 py-4 md:py-8 -mx-3 md:-mx-6"
                        style={{ scrollbarGutter: 'stable' }}
                    >
                        {vehicleList.map(([id, make, model, year, variant, imageURL], index) => {
      
                            return (
                                <div
                                    key={id}
                                    onClick={() => setSelectedVehicle([id, make, model, year, variant, imageURL])}
                                    className="flex-none w-64 md:w-80 bg-white rounded-2xl md:rounded-3xl shadow-md 
                                             hover:shadow-xl transition-all duration-400 border border-gray-100 
                                             hover:border-blue-200 group cursor-pointer transform hover:-translate-y-1 md:hover:-translate-y-2 
                                             overflow-hidden animate-fade-in flex flex-col"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <div className="relative overflow-hidden rounded-t-2xl md:rounded-t-3xl bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                                        <img
                                            src={imageURL || "/api/placeholder/400/300"}
                                            alt={`${make} ${model}`}
                                            className="w-full h-40 md:h-56 object-cover group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-600 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                        <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-1 md:gap-2">
                                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white 
                                                            px-2 py-1 md:px-3 md:py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm 
                                                            flex items-center gap-1">
                                                <Sparkles size={10} className="md:hidden" />
                                                <Sparkles size={12} className="hidden md:block" />
                                                <span className="text-xs">FEATURED</span>
                                            </span>
                                        </div>



                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 
                                                     opacity-0 group-hover:opacity-100 transition-opacity duration-400 
                                                     rounded-t-2xl md:rounded-t-3xl flex items-center justify-center">
                                            <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                                                <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 md:p-4 mb-2">
                                                    <Car size={20} className="md:hidden mx-auto" />
                                                    <Car size={32} className="hidden md:block mx-auto" />
                                                </div>
                                                <p className="font-bold text-sm md:text-xl mb-1">View Details</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-3 md:p-6 space-y-3 md:space-y-4 flex-1 flex flex-col">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-base md:text-xl mb-1 md:mb-2 line-clamp-1 group-hover:text-blue-700 transition-colors">
                                                {make} {model}
                                            </h3>

                                        </div>



                                        <button className="w-full bg-gradient-to-r from-gray-100 to-gray-50 
                                                        hover:from-blue-50 hover:to-purple-50 text-gray-700 
                                                        hover:text-blue-700 py-2 md:py-3.5 rounded-xl md:rounded-2xl 
                                                        font-medium md:font-semibold transition-all duration-300 
                                                        group-hover:shadow-md border border-gray-200 hover:border-blue-200
                                                        flex items-center justify-center gap-2 md:gap-3 
                                                        transform group-hover:scale-[1.02] text-xs md:text-base">
                                            <Car size={14} className="transition-transform group-hover:scale-110" />
                                            <span>Explore Parts</span>
                                            <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

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
                        <ChevronRight size={24} className="hidden md:block text-gray-700" />
                    </button>
                )}
            </div>

            <div className="flex justify-center mt-4 md:mt-8 space-x-1 md:space-x-2">
                {[1, 2, 3].map((dot) => (
                    <div
                        key={dot}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-300 transition-all duration-300 hover:bg-gray-400 cursor-pointer hover:scale-125"
                    />
                ))}
            </div>

            <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
        </section>
    );
};

export default VehicleScroll;