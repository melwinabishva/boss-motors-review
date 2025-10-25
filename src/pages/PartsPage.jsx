// src/pages/PartsPage.js
import React, { useContext, useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import {
    ArrowLeft,
    Search,
    X,
    ShoppingCart,
    Loader2,
    Plus,
    Minus,
    Filter,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import PartModal from "./model/ProductModelVehicle";

const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "Under ₹2K", min: 0, max: 2000 },
    { label: "₹2K-₹5K", min: 2000, max: 5000 },
    { label: "₹5K-₹10K", min: 5000, max: 10000 },
    { label: "Over ₹10K", min: 10001, max: Infinity },
];

const PartsPage = () => {
    const { vehicleId, type } = useParams();
    const {
        vehicles,
        parts,
        loading,
        addToCart,
        removeFromCart,
        cart,
        updateQuantity,

    } = useContext(DataContext);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
    const [scrollY, setScrollY] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [addedToCartId, setAddedToCartId] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { partsList, vehicle } = useMemo(() => {
        if (loading) return { partsList: [], vehicle: null };

        const vehicle = vehicles.slice(1).find((v) => v[0].toString() === vehicleId.toString());

        const partsList = parts
            .slice(1)
            .filter(
                (part) =>
                    part[1].toString() === vehicleId.toString() &&
                    part[2].trim().toLowerCase() === type.trim().toLowerCase() &&
                    (part[3].toLowerCase().includes(searchTerm.toLowerCase()) ||
                        part[4].toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .filter(
                (part) => Number(part[5]) >= selectedPriceRange.min && Number(part[5]) <= selectedPriceRange.max
            )
            .sort((a, b) => Number(a[5]) - Number(b[5]));

        return { partsList, vehicle };
    }, [vehicles, parts, loading, vehicleId, type, searchTerm, selectedPriceRange]);

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedPriceRange(priceRanges[0]);
    };

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedToCartId(item.id);
        setTimeout(() => setAddedToCartId(null), 1500);
    };

    const hasActiveFilters = searchTerm || selectedPriceRange.label !== "All";

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div
                className="bg-white border-b border-gray-200 sticky top-[64px] z-50 shadow-sm pb-2"
            >                <div className="max-w-7xl mx-auto px-3 sm:px-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 p-1 rounded-lg transition-colors shrink-0"
                            >
                                <ArrowLeft size={16} />
                            </button>

                            {vehicle && (
                                <div className="min-w-0 flex-1 hidden xs:block">
                                    <p className="text-xs text-gray-500 truncate">Shopping for</p>
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {vehicle[1]} {vehicle[2]}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 flex-1 max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search parts..."
                                    className="w-full pl-8 pr-6 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-1 px-2 py-1.5 text-xs border rounded-lg transition-colors ${hasActiveFilters
                                        ? "bg-blue-50 border-blue-200 text-blue-700"
                                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <Filter size={12} />
                                    <span className="hidden xs:inline">Filter</span>
                                    {hasActiveFilters && (
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                    )}
                                    {showFilters ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>

                                {showFilters && (
                                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px]">
                                        <div className="p-2">
                                            <div className="text-xs font-medium text-gray-700 mb-2">Price Range</div>
                                            <div className="space-y-1">
                                                {priceRanges.map((range) => (
                                                    <button
                                                        key={range.label}
                                                        onClick={() => {
                                                            setSelectedPriceRange(range);
                                                            setShowFilters(false);
                                                        }}
                                                        className={`w-full text-left px-2 py-1.5 text-xs rounded-md transition-colors ${selectedPriceRange.label === range.label
                                                            ? "bg-blue-100 text-blue-700 font-medium"
                                                            : "text-gray-600 hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        {range.label}
                                                    </button>
                                                ))}
                                            </div>
                                            {hasActiveFilters && (
                                                <button
                                                    onClick={() => {
                                                        clearFilters();
                                                        setShowFilters(false);
                                                    }}
                                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-500 hover:text-gray-700 mt-2 border-t pt-2"
                                                >
                                                    Clear filters
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {searchTerm && (
                                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                    Search: "{searchTerm}"
                                    <button onClick={() => setSearchTerm("")} className="hover:text-blue-900">
                                        <X size={10} />
                                    </button>
                                </span>
                            )}
                            {selectedPriceRange.label !== "All" && (
                                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                    Price: {selectedPriceRange.label}
                                    <button onClick={() => setSelectedPriceRange(priceRanges[0])} className="hover:text-blue-900">
                                        <X size={10} />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-4 pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">
                            {type} Parts
                            <span className="text-sm font-normal text-gray-500 ml-2">
                                ({partsList.length})
                            </span>
                        </h1>
                        {vehicle && (
                            <p className="text-xs text-gray-600 mt-0.5">
                                {vehicle[1]} {vehicle[2]}  • {vehicle[4]}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-8">
                {partsList.length === 0 ? (
                    <div className="text-center py-12">
                        <Filter className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 text-sm mb-4">
                            {hasActiveFilters
                                ? "No parts match your filters"
                                : "No parts available"
                            }
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-blue-600 hover:text-blue-700 underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                        {partsList.map((part) => {
                            const [partId, , typeFromSheet, name, desc, price, imageURL] = part;
                            const cartItem = cart.find((c) => c.id === partId && c.type === typeFromSheet);
                            const isJustAdded = addedToCartId === partId;

                            return (
                                <div
                                    key={`${typeFromSheet}-${partId}`}
                                    onClick={() => setSelectedPart(part)}
                                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                                >
                                    <div className="relative aspect-square bg-gray-100">
                                        <img
                                            src={imageURL || "/api/placeholder/300/200"}
                                            alt={name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                        <div className="absolute top-1.5 right-1.5 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                            ₹{Number(price).toLocaleString()}
                                        </div>
                                        {isJustAdded && (
                                            <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                                                <div className="text-white text-center">
                                                    <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center mx-auto mb-1">
                                                        <div className="w-2 h-1.5 border-l-2 border-b-2 border-white transform -rotate-45 -translate-y-0.5"></div>
                                                    </div>
                                                    <p className="text-xs font-semibold">Added!</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-2">
                                        <h3 className="font-medium text-gray-900 text-xs line-clamp-2 mb-1 leading-tight">
                                            {name}
                                        </h3>
                                        <p className="text-gray-600 text-xs line-clamp-2 mb-2 leading-relaxed">
                                            {desc}
                                        </p>

                                        {cartItem ? (
                                            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-1.5">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (cartItem.qty === 1) removeFromCart(partId, typeFromSheet);
                                                        else updateQuantity(partId, typeFromSheet, cartItem.qty - 1);
                                                    }}
                                                    className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Minus size={10} />
                                                </button>
                                                <span className="text-xs font-bold text-blue-600 min-w-6 text-center">
                                                    {cartItem.qty}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(partId, typeFromSheet, cartItem.qty + 1);
                                                    }}
                                                    className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Plus size={10} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart({
                                                        id: partId,
                                                        type: typeFromSheet,
                                                        name,
                                                        price: Number(price),
                                                        image: imageURL,
                                                        desc,
                                                    });
                                                }}
                                                className="w-full flex items-center justify-center gap-1 bg-blue-600 text-white text-xs font-medium py-1.5 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                            >
                                                <ShoppingCart size={12} />
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <PartModal
                part={selectedPart}
                isOpen={!!selectedPart}
                onClose={() => setSelectedPart(null)}
                cartItem={cart.find(
                    (c) => c.id === selectedPart?.[0] && c.type === selectedPart?.[2] // use correct type index
                )}
                addToCart={handleAddToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />

        </div>
    );
};

export default PartsPage;