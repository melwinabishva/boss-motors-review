// src/pages/CategoryView/CategoryView.js
import React, { useState, useContext, useMemo } from "react";
import { DataContext } from "../context/DataContext";
import CategoryList from "./components/CategoryList";
import PartCard from "./components/PartCard";
import CategoryHeaderWrapper from "./components/CategoryHeaderWrapper";
import UniversalModal from "../pages/model/ProductModelUniversel";

const CategoryView = () => {
    const { universalParts, loading, cart, addToCart, updateQuantity, removeFromCart } = useContext(DataContext);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedPart, setSelectedPart] = useState(null);
    const [addedToCartId, setAddedToCartId] = useState(null);

    // Unique categories
    const categories = useMemo(
        () => [...new Set(universalParts.map((p) => p[2]))],
        [universalParts]
    );

    // Unique brands for selected category
    const brands = useMemo(() => {
        if (!selectedCategory) return [];
        return [
            ...new Set(
                universalParts
                    .filter((p) => p[2] === selectedCategory)
                    .map((p) => p[3])
            ),
        ];
    }, [selectedCategory, universalParts]);

    // Filtered items based on category, brand, and search term
    const filteredItems = useMemo(() => {
        if (!selectedCategory) return [];
        return universalParts
            .filter((p) => p[2] === selectedCategory)
            .filter((p) => (selectedBrand ? p[3] === selectedBrand : true))
            .filter((p) =>
                searchTerm
                    ? p[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (p[4] && p[4].toLowerCase().includes(searchTerm.toLowerCase()))
                    : true
            );
    }, [selectedCategory, selectedBrand, searchTerm, universalParts]);

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedToCartId(item.id);
        setTimeout(() => setAddedToCartId(null), 1500);
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {!selectedCategory ? (
                <CategoryList categories={categories} onSelect={setSelectedCategory} />
            ) : (
                <div className="relative">
                    {/* Fixed Header */}
                    <CategoryHeaderWrapper
                        selectedCategory={selectedCategory}
                        onBack={() => {
                            setSelectedCategory(null);
                            setSearchTerm("");
                            setSelectedBrand("");
                        }}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedBrand={selectedBrand}
                        setSelectedBrand={setSelectedBrand}
                        brands={brands}
                    />

                    {/* Parts Grid */}
                    <div className="mt-4 pb-8">
                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                                {filteredItems.map((part) => {
                                    const cartItem = cart.find(
                                        (c) => c.id === part[0] && c.type === part[2]
                                    );
                                    const isJustAdded = addedToCartId === part[0];

                                    return (
                                        <div
                                            key={`${part[0]}-${part[2]}-${part[1]}`}
                                            onClick={() => setSelectedPart(part)}
                                        >
                                            <PartCard
                                                part={part}
                                                cartItem={cartItem}
                                                isJustAdded={isJustAdded}
                                                handleAddToCart={handleAddToCart}
                                                updateQuantity={updateQuantity}
                                                removeFromCart={removeFromCart}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 mt-6">No items found.</p>
                        )}
                    </div>


                </div>
            )}
        </div>
    );
};

export default CategoryView;
