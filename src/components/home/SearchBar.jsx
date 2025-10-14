import React, { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch && query.trim()) onSearch(query.trim());
    };

    const handleClear = () => {
        setQuery("");
        if (onSearch) onSearch("");
    };

    return (
        <div className="w-full flex justify-center my-6 px-4">
            <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
                <div className="relative group">
                    {/* Search Icon */}
                    <Search
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200"
                    />

                    {/* Input Field */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for products, tools, or parts..."
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     shadow-sm hover:shadow-md transition-all duration-200
                     bg-white text-gray-900 placeholder-gray-500
                     text-base"
                    />

                    {/* Clear Button */}
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       text-gray-400 hover:text-gray-600 transition-colors duration-200
                       p-1 rounded-full hover:bg-gray-100"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>


            </form>
        </div>
    );
};

export default SearchBar;