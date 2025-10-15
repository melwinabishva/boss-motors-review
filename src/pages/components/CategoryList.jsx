// src/pages/CategoryView/CategoryList.js
import React from "react";
import { colors } from '../../common/colors'

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
        <div className="p-4 md:p-6 mb-8"> {/* Added padding and bottom margin */}
            {/* Header category */}
            <h2 className="text-xl md:text-2xl font-bold mb-4">
                {headerCategory}
            </h2>

            {/* Rest of categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {otherCategories.map((cat, idx) => {
                    const color = getCategoryColor(cat);
                    const isSelected = selectedCategory === cat;

                    return (
                        <button
                            key={idx}
                            onClick={() => onSelect(cat)}
                            className={`
                                relative p-4 md:p-5 rounded-xl border-2 transition-all duration-300 
                                text-center font-semibold group overflow-hidden
                                hover:shadow-lg hover:scale-105 active:scale-95
                                focus:outline-none focus:ring-4 focus:ring-opacity-50
                                ${isSelected
                                    ? `${color.bg} ${color.border} shadow-md ring-4 ${color.ring} ring-opacity-50 scale-105`
                                    : `bg-white ${color.border} ${color.hover} shadow-sm`
                                }
                            `}
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br from-white to-${color.darkBg.split('-')[1]}-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />
                            <div className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${color.bg} flex items-center justify-center ${color.text} text-lg md:text-xl font-bold`}>
                                    {cat.charAt(0).toUpperCase()}
                                </div>
                                <span className={`text-xs md:text-sm font-semibold ${isSelected ? color.text : 'text-gray-700'}`}>
                                    {cat}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryList;
