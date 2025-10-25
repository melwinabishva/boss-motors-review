import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Car, Calendar, MapPin, Sparkles } from "lucide-react";
import { DataContext } from "../../context/DataContext";
import VehicleModal from "../../pages/model/VehicleModal";

const VehicleScroll = () => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const { vehicles, loading } = useContext(DataContext);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    if (loading || vehicles.length <= 1) return null;

    const vehicleList = vehicles.slice(1, 11);

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
    }, [vehicleList]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });

            setTimeout(updateArrowVisibility, 300);
        }
    };

    const handleScroll = () => {
        updateArrowVisibility();
    };

    return (
        <section className="py-12 px-4 md:px-8 relative max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-2">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                        <Car className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Vehicles</h2>
                        <p className="text-gray-500 text-sm mt-1">Browse our latest vehicle collection</p>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/vehicle")}
                    className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 
                             font-semibold text-base px-4 py-2 rounded-lg hover:bg-blue-50 
                             transition-all duration-200"
                >
                    View All Vehicles
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="relative group">
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

                <div className="mx-2 md:mx-4">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex space-x-5 md:space-x-6 overflow-x-auto scroll-smooth 
             scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 
             px-4 py-6 -mx-4"
                    >
                        {vehicleList.map(([id, make, model, year, variant, imageURL], index) => (
                            <div
                                key={id}
                                onClick={() => setSelectedVehicle([id, make, model, year, variant, imageURL])}
                                className="flex-none w-72 md:w-80 bg-white rounded-2xl shadow-sm 
                                         hover:shadow-2xl transition-all duration-500 border border-gray-100 
                                         hover:border-gray-200 group cursor-pointer transform hover:-translate-y-1"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="relative overflow-hidden rounded-t-2xl bg-gray-100">
                                    <img
                                        src={imageURL || "/api/placeholder/400/300"}
                                        alt={`${make} ${model}`}
                                        className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="absolute top-4 left-4">
                                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white 
                                                        px-3 py-1.5 rounded-full text-xs font-bold shadow-lg 
                                                        flex items-center gap-1">
                                            <Sparkles size={12} />
                                            FEATURED
                                        </span>
                                    </div>

                                    {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm 
                                                 rounded-full px-3 py-1.5 shadow-lg">
                                        <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                                            <Calendar size={12} />
                                            {year}
                                        </div>
                                    </div> */}

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                                 transition-opacity duration-300 rounded-t-2xl flex items-center justify-center">
                                        <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <Car size={32} className="mx-auto mb-2" />
                                            <p className="font-semibold text-lg">View Details</p>
                                            <p className="text-sm opacity-90">Click to explore parts</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 space-y-3">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-xl mb-1 line-clamp-1">
                                            {make} {model}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <MapPin size={14} />
                                            <span className="line-clamp-1">{variant}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="text-center">
                                            <div className="text-sm font-semibold text-gray-900">10+</div>
                                            <div className="text-xs text-gray-500">Part Types</div>
                                        </div>
                                        <div className="h-8 w-px bg-gray-200"></div>
                                        <div className="text-center">
                                            <div className="text-sm font-semibold text-gray-900">50+</div>
                                            <div className="text-xs text-gray-500">Parts Available</div>
                                        </div>
                                    </div>


                                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 
                                                    py-2.5 rounded-xl font-medium transition-all duration-200 
                                                    group-hover:bg-blue-50 group-hover:text-blue-600 
                                                    flex items-center justify-center gap-2">
                                        <Car size={16} />
                                        Explore Parts
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

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
            </div>

            <div className="flex justify-center mt-6 space-x-1">
                {[1, 2, 3].map((dot) => (
                    <div
                        key={dot}
                        className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300 hover:bg-gray-400"
                    />
                ))}
            </div>

            <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
        </section>
    );
};

export default VehicleScroll;