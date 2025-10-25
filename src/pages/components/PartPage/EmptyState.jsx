
import React from "react";
import { Sparkles } from "lucide-react";

const EmptyState = ({ searchTerm, hasActiveFilters, clearFilters }) => {
    return (
        <div className="text-center py-12 max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
                <Sparkles size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No parts found</h3>
                <p className="text-gray-500 text-sm mb-6">
                    {searchTerm ? `No results for "${searchTerm}"` : "No parts match your current filters"}
                </p>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
