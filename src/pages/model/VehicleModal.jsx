import React from "react";
import { X, Car, Calendar, Tag, ExternalLink, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VehicleModal = ({ vehicle, onClose }) => {
    const navigate = useNavigate();

    if (!vehicle) return null;

    const [id, make, model, year, variant, imageURL] = vehicle;

    const handleCategorySelect = (category) => {
        onClose(); // Close modal first for better UX
        navigate(`/parts/${id}/${category}`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Enhanced Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
                {/* Header with Gradient */}
                <div className="relative h-48 overflow-hidden bg-gradient(135deg, #667eea 0%, #764ba2 100%)">
                    {/* Vehicle Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={imageURL || "/api/placeholder/400/300"}
                            alt={`${make} ${model}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 group"
                    >
                        <X size={20} className="text-gray-700 group-hover:text-gray-900" />
                    </button>

                    {/* Vehicle Badge */}
                    {/* <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                        <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                            <Car size={14} />
                            <span>{year}</span>
                        </div>
                    </div> */}
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                    {/* Title Section */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                            {make} {model}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Tag size={16} />
                                <span className="font-medium">{variant}</span>
                            </div>
                            {/* <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <span>{year}</span>
                            </div> */}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Action Section */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            <Sparkles size={16} />
                            Select Category
                        </h3>

                        <div className="grid gap-3">
                            <button
                                onClick={() => handleCategorySelect("body")}
                                className="group relative flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-100 hover:border-blue-300 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <Car size={20} className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">Body Parts</div>
                                        <div className="text-sm text-gray-600">Exterior & Interior components</div>
                                    </div>
                                </div>
                                <ExternalLink size={18} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>

                            <button
                                onClick={() => handleCategorySelect("electrical")}
                                className="group relative flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 border-2 border-green-100 hover:border-green-300 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">Electrical</div>
                                        <div className="text-sm text-gray-600">Wiring & Electronic systems</div>
                                    </div>
                                </div>
                                <ExternalLink size={18} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    </div>


                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                        Ready to find the perfect parts for your {make} {model}
                    </p>
                </div>
            </div>
        </div>
    );
};



export default VehicleModal;