// CategoryHeader.js
import React, { useState, useRef } from "react";
import { ArrowLeft, Search, Filter, X, Grid, List } from "lucide-react";

const CategoryHeader = ({
    selectedCategory,
    onBack,
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    brands,
    viewMode,
    setViewMode
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const searchInputRef = useRef(null);

    return (
        <div className="bg-white border-b border-gray-200 sticky top-[60px] md:top-[64px] z-40">
            {/* First Line: Back button, Title, and View Toggles */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 text-blue-600 hover:underline text-sm sm:text-base"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900 truncate whitespace-nowrap">
                        {selectedCategory}
                    </h2>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="relative w-40 sm:w-48 flex-shrink-0">
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="appearance-none pl-8 pr-6 py-2 border border-gray-300 bg-white rounded-lg text-sm text-gray-700 hover:border-gray-400 transition cursor-pointer w-full"
                        >
                            <option value="">All Brands</option>
                            {brands.map((brand, idx) => (
                                <option key={idx} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                        <Filter
                            size={16}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                    </div>
                    <button
                        className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                        onClick={() => setViewMode("grid")}
                    >
                        <Grid size={16} />
                    </button>
                    <button
                        className={`p-2 rounded ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                        onClick={() => setViewMode("list")}
                    >
                        <List size={16} />
                    </button>

                </div>

            </div>

            {/* Second Line: Full-width Search and Filter */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-3 flex items-center gap-3">
                {/* Search Input - Takes available space */}
                <div
                    className={`flex-1 flex items-center bg-white border rounded-lg px-3 py-2 transition-all duration-200
                        ${isFocused ? "border-blue-400 shadow-sm" : "border-gray-300"}`}
                >
                    <Search
                        size={16}
                        className={`mr-2 ${isFocused ? "text-blue-500" : "text-gray-400"}`}
                    />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-500 w-full"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="ml-1 text-gray-400 hover:text-gray-600 p-0.5"
                        >
                            <X size={12} />
                        </button>
                    )}
                </div>

                {/* Brand Filter */}

            </div>
        </div>
    );
};

export default CategoryHeader;