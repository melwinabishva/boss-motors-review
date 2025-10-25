import React from "react";
import { colors } from '../../common/colors';

const getCategoryColor = (category) => {
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const CategoryList = ({ categories, onSelect, selectedCategory }) => {
    if (!categories || categories.length === 0) return null;

    const [headerCategory, ...otherCategories] = categories;

    return (
        <div className="px-4 md:px-6 py-6 mb-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {headerCategory}
                </h2>
                <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                    Browse through our wide range of automotive parts and accessories
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 max-w-7xl mx-auto">
                {otherCategories.map((cat, idx) => {
                    const color = getCategoryColor(cat);
                    const isSelected = selectedCategory === cat;

                    return (
                        <button
                            key={idx}
                            onClick={() => onSelect(cat)}
                            className={`
                                relative p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 
                                text-center font-semibold group overflow-hidden
                                hover:shadow-xl hover:scale-105 active:scale-95 transform
                                focus:outline-none focus:ring-4 focus:ring-opacity-50
                                ${isSelected
                                    ? `${color.bg} ${color.border} shadow-lg ring-4 ${color.ring} ring-opacity-30 scale-105 border-2`
                                    : `bg-white border-gray-200 hover:border-${color.border.split('-')[1]} shadow-sm hover:shadow-md`
                                }
                            `}
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white to-${color.bg.split('-')[1]}-50`} />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center gap-3">
                                {/* Icon Circle */}
                                <div className={`
                                    w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center 
                                    transition-all duration-300 group-hover:scale-110
                                    ${isSelected
                                        ? `${color.bg} ${color.text} shadow-lg`
                                        : `${color.bg} ${color.text} shadow-md`
                                    }
                                `}>
                                    <span className="text-lg md:text-xl font-bold">
                                        {cat.charAt(0).toUpperCase()}
                                    </span>
                                </div>

                                {/* Category Name */}
                                <span className={`
                                    text-xs md:text-sm font-semibold transition-colors duration-300
                                    ${isSelected
                                        ? `${color.text} font-bold`
                                        : 'text-gray-700 group-hover:text-gray-900'
                                    }
                                `}>
                                    {cat}
                                </span>
                            </div>

                            {/* Selection Indicator */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Selected Category Indicator */}
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