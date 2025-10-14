import React, { useContext, useState, useEffect, useMemo } from "react";
import { DataContext } from "../context/DataContext";
import { ShoppingCart, Plus, Minus, Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";

const PartsList = () => {
    const { universalParts, loading, addToCart, cart, updateQuantity } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [addedToCartId, setAddedToCartId] = useState(null);

    // Memoized filtered parts
    const filteredParts = useMemo(() => {
        if (!universalParts) return [];

        let filtered = universalParts.slice(1);
        return filtered.filter((part) => {
            const partName = part[1]?.toLowerCase() || '';
            const brand = part[3]?.toLowerCase() || '';
            const category = part[2]?.toLowerCase() || '';
            return (
                partName.includes(searchTerm.toLowerCase()) &&
                (brandFilter ? brand === brandFilter.toLowerCase() : true) &&
                (categoryFilter ? category === categoryFilter.toLowerCase() : true)
            );
        });
    }, [searchTerm, brandFilter, categoryFilter, universalParts]);

    // Memoized brands and categories
    const { brands, categories } = useMemo(() => {
        if (!universalParts) return { brands: [], categories: [] };

        const parts = universalParts.slice(1);
        return {
            brands: [...new Set(parts.map(p => p[3]).filter(Boolean))],
            categories: [...new Set(parts.map(p => p[2]).filter(Boolean))]
        };
    }, [universalParts]);

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedToCartId(item.id);
        setTimeout(() => setAddedToCartId(null), 1500);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setBrandFilter("");
        setCategoryFilter("");
        setShowFilters(false);
    };

    const hasActiveFilters = searchTerm || brandFilter || categoryFilter;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!universalParts) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <p className="text-gray-500 text-sm mb-3">No parts found</p>
                <button
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Compact Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                        {/* Title */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg font-bold text-gray-900 truncate">Auto Parts</h1>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {filteredParts.length} {filteredParts.length === 1 ? 'part' : 'parts'} available
                            </p>
                        </div>

                        {/* Search & Filter Controls */}
                        <div className="flex items-center gap-2">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-32 xs:w-40 border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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

                            {/* Filter Toggle */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-1 px-2 py-1.5 border rounded-lg text-sm transition-colors ${hasActiveFilters
                                        ? "bg-blue-50 border-blue-200 text-blue-700"
                                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <Filter size={14} />
                                    <span className="hidden xs:inline">Filter</span>
                                    {hasActiveFilters && (
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                    )}
                                    {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>

                                {/* Filter Dropdown */}
                                {showFilters && (
                                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[160px]">
                                        <div className="p-2 space-y-3">
                                            {/* Brand Filter */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
                                                <select
                                                    value={brandFilter}
                                                    onChange={(e) => setBrandFilter(e.target.value)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="">All Brands</option>
                                                    {brands.map((brand, idx) => (
                                                        <option key={idx} value={brand}>{brand}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Category Filter */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                                                <select
                                                    value={categoryFilter}
                                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="">All Categories</option>
                                                    {categories.map((category, idx) => (
                                                        <option key={idx} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Clear Filters */}
                                            {hasActiveFilters && (
                                                <button
                                                    onClick={clearFilters}
                                                    className="w-full text-center text-xs text-blue-600 hover:text-blue-700 pt-2 border-t"
                                                >
                                                    Clear all filters
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Bar */}
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
                            {brandFilter && (
                                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                    Brand: {brandFilter}
                                    <button onClick={() => setBrandFilter("")} className="hover:text-blue-900">
                                        <X size={10} />
                                    </button>
                                </span>
                            )}
                            {categoryFilter && (
                                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                    Category: {categoryFilter}
                                    <button onClick={() => setCategoryFilter("")} className="hover:text-blue-900">
                                        <X size={10} />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Parts Grid */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
                {filteredParts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <Filter className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-sm font-medium text-gray-900 mb-2">No parts found</h3>
                        <p className="text-xs text-gray-600 mb-4">
                            {hasActiveFilters
                                ? "Try adjusting your filters to see more results."
                                : "No parts available at the moment."
                            }
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-blue-600 hover:text-blue-700 underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {filteredParts.map((part) => {
                            const type = part[8] || "universal";
                            const cartItem = cart.find((c) => c.id === part[0] && c.type === type);
                            const isJustAdded = addedToCartId === part[0];

                            return (
                                <div
                                    key={`${type}-${part[0]}`}
                                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative bg-gray-100 aspect-square flex items-center justify-center p-3">
                                        <img
                                            src={part[6]}
                                            alt={part[1]}
                                            className="w-full h-full object-contain"
                                            onError={(e) => { e.target.src = "/api/placeholder/300/200"; }}
                                        />
                                        {/* Added to Cart Overlay */}
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

                                    {/* Content */}
                                    <div className="p-2 flex-1 flex flex-col">
                                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-1 text-xs leading-tight flex-1">
                                            {part[1]}
                                        </h3>

                                        <div className="space-y-1.5 mt-auto">
                                            {/* Brand & Category */}
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 truncate max-w-[45%]">
                                                    {part[2]}
                                                </span>
                                                <span className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-700 truncate max-w-[45%]">
                                                    {part[3]}
                                                </span>
                                            </div>

                                            {/* Price & Description */}
                                            <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                                                <span className="text-xs text-gray-600 truncate mr-2 flex-1">
                                                    {part[4]}
                                                </span>
                                                <span className="font-bold text-gray-900 whitespace-nowrap text-sm">
                                                    ₹{part[5]}
                                                </span>
                                            </div>

                                            {/* Cart Controls */}
                                            {cartItem ? (
                                                <div className="flex justify-center items-center gap-2 mt-1.5">
                                                    <button
                                                        onClick={() => updateQuantity(part[0], type, cartItem.qty - 1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <Minus size={10} />
                                                    </button>
                                                    <span className="text-sm font-bold text-blue-600 min-w-6 text-center">
                                                        {cartItem.qty}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(part[0], type, cartItem.qty + 1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <Plus size={10} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddToCart({
                                                        id: part[0],
                                                        type,
                                                        name: part[1],
                                                        price: Number(part[5]),
                                                        image: part[6],
                                                        desc: part[4],
                                                    })}
                                                    className="w-full flex items-center justify-center gap-1 bg-blue-600 text-white text-xs font-medium py-1.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-1.5"
                                                >
                                                    <ShoppingCart size={12} />
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>


        </div>
    );
};

export default PartsList;