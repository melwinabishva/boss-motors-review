import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import UniversalModal from "../model/ProductModelUniversel";

const PartCard = ({ part }) => {
    const { cart, addToCart, removeFromCart, updateQuantity } = useContext(DataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [justAddedId, setJustAddedId] = useState(null);

    const [partId, , typeFromSheet, name, desc, price, imageURL] = part;

    const cartItem = cart.find(c => c.id === partId && c.type === typeFromSheet);
    const isJustAdded = justAddedId === partId;

    const handleAddToCart = () => {
        addToCart({ id: partId, type: typeFromSheet, name, price: Number(price), image: imageURL, desc });
        setJustAddedId(partId);
        setTimeout(() => setJustAddedId(null), 1500);
    };

    return (
        <>
            <div
                className="group border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all duration-200 hover:border-gray-300 active:scale-95 flex flex-col h-full cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="relative overflow-hidden bg-gray-100">
                    <img
                        src={imageURL || "/api/placeholder/300/200"}
                        alt={name}
                        className="w-full h-32 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isJustAdded && (
                        <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                            <p className="text-white text-sm font-semibold">Added!</p>
                        </div>
                    )}
                </div>

                <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">{name}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2 flex-1">{desc}</p>

                    <div className="flex items-center justify-between mt-auto">
                        <p className="font-bold text-base text-gray-900">₹{Number(price).toLocaleString()}</p>
                        <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{part[3]}</p>
                    </div>

                    <div className="mt-2">
                        {cartItem ? (
                            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-1.5">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (cartItem.qty === 1) removeFromCart(partId, typeFromSheet);
                                        else updateQuantity(partId, typeFromSheet, cartItem.qty - 1);
                                    }}
                                    className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    <Minus size={10} />
                                </button>
                                <span className="text-xs font-bold text-blue-600 min-w-6 text-center">{cartItem.qty}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateQuantity(partId, typeFromSheet, cartItem.qty + 1);
                                    }}
                                    className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    <Plus size={10} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart();
                                }}
                                className="w-full flex items-center justify-center gap-1 bg-blue-600 text-white text-xs font-medium py-1.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-2"
                            >
                                <ShoppingCart size={12} /> Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <UniversalModal
                part={part}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cartItem={cartItem}
                addToCart={handleAddToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />
        </>
    );
};

export default PartCard;
