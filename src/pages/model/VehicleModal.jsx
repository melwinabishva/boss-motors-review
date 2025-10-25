import React from "react";
import {
    X,
    Car,
    Tag,
    ExternalLink,
    Sparkles,
    Zap,
    Gauge,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VehicleModal = ({ vehicle, onClose }) => {
    const navigate = useNavigate();
    if (!vehicle) return null;

    const [id, make, model, year, variant, imageURL] = vehicle;

    const handleCategorySelect = (category) => {
        onClose();
        navigate(`/parts/${id}/${category}`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* --- Overlay --- */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* --- Modal Card --- */}
            <div className="relative bg-white/95 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-up">
                {/* --- Header Image --- */}
                <div className="relative h-52">
                    <img
                        src={imageURL || "/api/placeholder/400/300"}
                        alt={`${make} ${model}`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    >
                        <X size={20} className="text-gray-700" />
                    </button>

                    {/* Header Info */}
                    <div className="absolute bottom-3 left-5">
                        <h2 className="text-2xl font-bold text-white drop-shadow-md">
                            {make} {model}
                        </h2>
                        <p className="text-gray-200 text-sm">{variant}</p>
                    </div>
                </div>

                {/* --- Body --- */}
                <div className="p-6 space-y-5">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold uppercase text-sm tracking-wide">
                        <Sparkles size={16} className="text-blue-500" />
                        Select a Category
                    </div>

                    <div className="grid gap-4">
                        {/* Body Parts */}
                        <button
                            onClick={() => handleCategorySelect("body")}
                            className="group flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-blue-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                                    <Car size={22} className="text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-gray-900">Body Parts</div>
                                    <div className="text-sm text-gray-600">
                                        Exterior & Interior components
                                    </div>
                                </div>
                            </div>
                            <ExternalLink
                                size={18}
                                className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                        </button>

                        {/* Electrical */}
                        <button
                            onClick={() => handleCategorySelect("electrical")}
                            className="group flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                                    <Zap size={22} className="text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-gray-900">Electrical</div>
                                    <div className="text-sm text-gray-600">
                                        Wiring & Electronic systems
                                    </div>
                                </div>
                            </div>
                            <ExternalLink
                                size={18}
                                className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                        </button>


                    </div>
                </div>

                {/* --- Footer --- */}
                <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
                    <p className="text-xs text-gray-600 text-center">
                        Ready to find the perfect parts for your {make} {model}?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VehicleModal;
