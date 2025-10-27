
import React from "react";
import PartCard from "./PartCard";
import EmptyState from "./EmptyState";
import { Sparkles } from "lucide-react";

const PartsList = ({ partsList, viewMode, cart, addedToCartId, handleAddToCart, updateQuantity, removeFromCart, setSelectedPart, searchTerm, hasActiveFilters, clearFilters }) => {
    if (partsList.length === 0) return <EmptyState searchTerm={searchTerm} hasActiveFilters={hasActiveFilters} clearFilters={clearFilters} />;

    return (
        <div
            className={
                viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            }
        >

            {partsList.map((part) => {
                const [partId, , typeFromSheet] = part;
                const cartItem = cart.find((c) => c.id === partId && c.type === typeFromSheet);
                const isJustAdded = addedToCartId === partId;

                return (
                    <PartCard
                        key={`${typeFromSheet}-${partId}`}
                        part={part}
                        viewMode={viewMode}
                        cartItem={cartItem}
                        isJustAdded={isJustAdded}
                        handleAddToCart={handleAddToCart}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                        onClick={() => setSelectedPart(part)}
                    />
                );
            })}
        </div>

    );
};

export default PartsList;
