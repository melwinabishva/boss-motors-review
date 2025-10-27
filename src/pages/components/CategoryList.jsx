import React from "react";
import { colors } from "../../common/colors";

const getCategoryColor = (category) => {
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const CategoryList = ({ categories, onSelect, selectedCategory, universalParts }) => {
    if (!categories || categories.length === 0) return null;

    const [headerCategory, ...otherCategories] = categories;

    const getCategoryImage = (category) => {
        const part = universalParts.find((p) => p[2] === category && p[6]);
        return part ? part[6] : "https://via.placeholder.com/80?text=No+Image";
    };

    return (
        <div className="px-4 md:px-6 py-6 mb-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {headerCategory}
                </h2>

            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
                {otherCategories.map((cat, idx) => {
                    const color = getCategoryColor(cat);
                    const isSelected = selectedCategory === cat;
                    const imageUrl = getCategoryImage(cat);

                    return (
                        <button
                            key={idx}
                            onClick={() => onSelect(cat)}
                            className={`relative flex flex-col items-center justify-center gap-2 
                p-4 md:p-5 rounded-2xl border-2 text-center font-semibold group overflow-hidden
                transition-all duration-300 ease-in-out
                hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none
                ${isSelected
                                    ? `${color.bg} ${color.border} shadow-lg ring-4 ${color.ring} ring-opacity-30 border-2`
                                    : `bg-white border-gray-200 hover:border-${color.border.split('-')[1]}`
                                }
              `}
                            style={{ minHeight: "140px" }} // Ensures consistent height
                        >
                            {/* Image Wrapper */}
                            <div
                                className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 
      flex items-center justify-center bg-gray-100 transition-all duration-300
      ${isSelected ? `${color.border}` : "border-gray-200"}
  `}
                            >
                                <img
                                    src={imageUrl}
                                    alt={cat}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>


                            {/* Category Name */}
                            <span
                                className={`text-xs md:text-sm font-semibold transition-colors duration-300
                ${isSelected ? `${color.text} font-bold` : "text-gray-700 group-hover:text-gray-900"}
              `}
                            >
                                {cat}
                            </span>

                            {/* Selection Indicator */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Selected Category Display */}
            {selectedCategory && (
                <div className="text-center mt-6">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        <span>Selected:</span>
                        <span className="font-bold">{selectedCategory}</span>
                        <button
                            onClick={() => onSelect(null)}
                            className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
