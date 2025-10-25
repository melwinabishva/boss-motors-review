
import React, { useRef } from "react";
import { ArrowLeft, Search, X, Filter, ChevronDown, ChevronUp, Grid, List } from "lucide-react";

const PartsHeader = ({
    vehicle,
    navigate,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    hasActiveFilters,
    selectedPriceRange,
    setSelectedPriceRange,
    priceRanges,
    clearFilters
}) => {
    const filterRef = useRef(null);

    return (
        <div className="bg-white/95 border-b border-gray-200 sticky top-[60px] sm:top-[64px] z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-col gap-2">

                {/* Top row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 p-1 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        {vehicle && (
                            <div>
                                <p className="text-xs text-gray-500 truncate">Shopping for</p>
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {vehicle[1]} {vehicle[2]}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Filter + View toggle */}
                    <div className="flex items-center gap-2">
                        <div className="relative" ref={filterRef}>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-1 px-2 py-1.5 text-sm border rounded-lg transition-colors ${hasActiveFilters ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                            >
                                <Filter size={16} />
                                {hasActiveFilters && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>}
                                {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {showFilters && (
                                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[160px]">
                                    <div className="p-2 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-gray-700">Price Range</span>
                                            {selectedPriceRange.label !== "All" && (
                                                <button onClick={() => setSelectedPriceRange(priceRanges[0])} className="text-blue-600 hover:text-blue-700 text-xs">
                                                    Clear
                                                </button>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            {priceRanges.map((range) => (
                                                <button
                                                    key={range.label}
                                                    onClick={() => {
                                                        setSelectedPriceRange(range);
                                                        setShowFilters(false);
                                                    }}
                                                    className={`w-full text-left px-2 py-1.5 text-xs rounded-md transition-colors ${selectedPriceRange.label === range.label ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"}`}
                                                >
                                                    {range.label}
                                                </button>
                                            ))}
                                        </div>
                                        {hasActiveFilters && (
                                            <button
                                                onClick={() => clearFilters()}
                                                className="w-full text-left px-2 py-1.5 text-xs text-gray-500 hover:text-gray-700 border-t mt-2 pt-2"
                                            >
                                                Clear all
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Grid/List Toggle */}
                        <div className="flex items-center gap-1 border rounded-lg p-1 bg-white/80">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                            >
                                <Grid size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                            >
                                <List size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search bar */}
                <div className="w-full">
                    <div className="relative w-full">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search parts..."
                            className="w-full pl-8 pr-6 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartsHeader;
