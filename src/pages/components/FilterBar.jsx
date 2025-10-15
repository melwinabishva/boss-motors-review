// src/pages/CategoryView/FilterBar.js
import React, { useState, useRef } from "react";
import { Search, Filter } from "lucide-react";

const FilterBar = ({ searchTerm, setSearchTerm, selectedBrand, setSelectedBrand, brands }) => {
    const [isFocused, setIsFocused] = useState(false);
    const searchInputRef = useRef(null);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            {/* Left: Title and count (optional) */}
            <div className="flex flex-col">
                <h2 className="font-semibold text-lg text-gray-800">Products</h2>
                <p className="text-sm text-gray-500">
                    {brands.length > 0 ? `${brands.length} brands available` : ""}
                </p>
            </div>

            {/* Right: Search + Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Search Input */}
                <div
                    className={`flex items-center bg-white border rounded-lg px-3 py-2 transition-all duration-200 w-full sm:w-64
                    ${isFocused ? "border-blue-400 shadow-sm" : "border-gray-300"}`}
                >
                    <Search
                        size={16}
                        className={`mr-2 ${isFocused ? "text-blue-500" : "text-gray-400"}`}
                    />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-500"
                    />
                </div>

                {/* Filter Dropdown Button */}
                <div className="relative">
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="appearance-none pl-8 pr-6 py-2 border border-gray-300 bg-white rounded-lg text-sm text-gray-700 hover:border-gray-400 transition cursor-pointer"
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
            </div>
        </div>
    );
};

export default FilterBar;
