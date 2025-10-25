import React, { useContext, useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import PartModal from "./model/ProductModelVehicle";
import PartsHeader from "./components/PartPage/PartsHeader";
import PartsList from "./components/PartPage/PartsList";
import { priceRanges } from "../common/common";
import { useViewMode } from "../context/ViewModeProvider";



const PartsPage = () => {
    const { vehicleId, type } = useParams();
    const { vehicles, parts, loading, addToCart, removeFromCart, cart, updateQuantity } = useContext(DataContext);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
    const { viewMode, setViewMode } = useViewMode();
    const [showFilters, setShowFilters] = useState(false);
    const [selectedPart, setSelectedPart] = useState(null);
    const [addedToCartId, setAddedToCartId] = useState(null);

    const { partsList, vehicle } = useMemo(() => {
        if (loading) return { partsList: [], vehicle: null };
        const vehicle = vehicles.slice(1).find((v) => v[0].toString() === vehicleId.toString());
        const partsList = parts
            .slice(1)
            .filter(
                (part) =>
                    part[1].toString() === vehicleId.toString() &&
                    part[2].trim().toLowerCase() === type.trim().toLowerCase() &&
                    (part[3].toLowerCase().includes(searchTerm.toLowerCase()) ||
                        part[4].toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .filter((part) => Number(part[5]) >= selectedPriceRange.min && Number(part[5]) <= selectedPriceRange.max)
            .sort((a, b) => Number(a[5]) - Number(b[5]));
        return { partsList, vehicle };
    }, [vehicles, parts, vehicleId, type, searchTerm, selectedPriceRange, loading]);

    const hasActiveFilters = searchTerm || selectedPriceRange.label !== "All";
    const clearFilters = () => { setSearchTerm(""); setSelectedPriceRange(priceRanges[0]); setShowFilters(false); };
    const handleAddToCart = (item) => { addToCart(item); setAddedToCartId(item.id); setTimeout(() => setAddedToCartId(null), 1500); };

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            <PartsHeader
                vehicle={vehicle}
                navigate={navigate}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                viewMode={viewMode}
                setViewMode={setViewMode}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                hasActiveFilters={hasActiveFilters}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                priceRanges={priceRanges}
                clearFilters={clearFilters}
            />

            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
                <PartsList
                    partsList={partsList}
                    viewMode={viewMode}
                    cart={cart}
                    addedToCartId={addedToCartId}
                    handleAddToCart={handleAddToCart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    setSelectedPart={setSelectedPart}
                    searchTerm={searchTerm}
                    hasActiveFilters={hasActiveFilters}
                    clearFilters={clearFilters}
                />
            </div>

            <PartModal
                part={selectedPart}
                isOpen={!!selectedPart}
                onClose={() => setSelectedPart(null)}
                cartItem={cart.find((c) => c.id === selectedPart?.[0] && c.type === selectedPart?.[2])}
                addToCart={handleAddToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />
        </div>
    );
};

export default PartsPage;
