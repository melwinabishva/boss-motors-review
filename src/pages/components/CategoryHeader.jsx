import React, { useState, useRef } from "react";
import { ArrowLeft, Search, Filter, X } from "lucide-react";

const CategoryHeader = ({
    selectedCategory,
    onBack,
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    brands
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const searchInputRef = useRef(null);

    return (
        <div className="bg-white border-b border-gray-200 sticky top-[64px] z-40">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
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

                <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                    {/* <div
                        className={`flex items-center bg-white border rounded-lg px-3 py-1.5 transition-all duration-200 w-40 sm:w-64
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
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="ml-1 text-gray-400 hover:text-gray-600 p-0.5"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div> */}

                    <div className="relative w-40 sm:w-auto">
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="appearance-none pl-8 pr-6 py-1.5 border border-gray-300 bg-white rounded-lg text-sm text-gray-700 hover:border-gray-400 transition cursor-pointer w-full"
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
        </div>
    );
};

export default CategoryHeader;
