
import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Plus, Minus, Trash2, ShoppingCart, X, MapPin, User, Phone, Mail } from "lucide-react";
import Whatsapp from '../assets/whatsapp.gif';
const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(DataContext);

    const [showModal, setShowModal] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const itemCount = cart.reduce((acc, item) => acc + (item.qty || 0), 0);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-gray-600 px-4">
                <div className="text-center">
                    <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <ShoppingCart size={48} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-md">
                        Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const generateWhatsAppMessage = (cartItems, user) => {
        const { name, mobile, email, address } = user;

        let message = `🛒 *New Order* 🛒\n\n`;
        message += `*Customer Details:*\n`;
        message += `👤 Name: ${name}\n`;
        message += `📱 Mobile: ${mobile}\n`;
        message += `📧 Email: ${email}\n`;
        message += `📍 Address: ${address}\n\n`;

       /* message += `*Ordered Items:*\n`;
        cartItems.forEach((item, idx) => {
            message += `\n${idx + 1}. *${item.name}* \n`;
            /*message += `   🚗 ${item.make} ${item.model} (${item.variant})\n`;
            message += `   🚗 Vehicle ID: ${item.vehicleName || "Not specified"}\n`;
            message += `   📝 ${item.desc} (${item.type}) \n `;
            message += `   💰 Price: ₹${item.price} x ${item.qty} = ₹${item.price * item.qty}\n`; */
            message += `*Ordered Items:*\n`;

cartItems.forEach((item, idx) => {
   /* message += `\n${idx + 1}. *${item.name}*\n`;*/
 const title = item.isUniversal 
        ? item.brand   // universal → product name here
        : item.name;   // vehicle → product name

    message += `\n${idx + 1}. *${title}*\n`;

    // 🔥 Vehicle parts
    if (item.vehicleName) {
        message += `   🚗 ${item.vehicleName}\n`;
        message += `   📝 ${item.desc} (${item.type}) \n `;
    }

    // 🔥 Universal parts
    if (item.isUniversal) {
       if (item.type) {
        message += `   📂 Category: ${item.type}\n`;
    }
    if (item.brand) {
        message += `   🏷️ Brand: ${item.name}\n`;
    }
    if (item.desc) {
        message += `   📝 ${item.desc}\n`;
    }
    }

    // 💰 Price
    message += `   💰 Price: ₹${item.price} x ${item.qty} = ₹${item.price * item.qty}\n`;

        });

        const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        message += `\n📦 *Total Items:* ${itemCount}`;
        message += `\n💵 *Total Amount:* ₹${total}\n\n`;
        message += `Please confirm this order. ✅`;

        return encodeURIComponent(message);
    };

    const handleWhatsAppCheckout = async () => {
        const { name, mobile, email, address } = userDetails;

        // Enhanced validation
        if (!name.trim() || !mobile.trim() || !email.trim() || !address.trim()) {
            alert("Please fill in all customer details before proceeding.");
            return;
        }

        // Basic mobile validation
        if (!/^\d{10}$/.test(mobile.replace(/\D/g, ''))) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);

        // Simulate processing delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        const url = `https://api.whatsapp.com/send?phone=918610125156&text=${generateWhatsAppMessage(
            cart,
            userDetails
        )}`;

        // Clear cart and close modal
        clearCart();
        setShowModal(false);
        setIsSubmitting(false);

        window.open(url, "_blank");
    };

    const handleQuantityChange = (id, type, newQty) => {
        if (newQty < 1) return;
        if (newQty > 10) {
            alert("Maximum quantity per item is 10");
            return;
        }
        updateQuantity(id, type, newQty);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-500 mt-2">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>
                <button
                    onClick={clearCart}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <Trash2 size={18} />
                    Clear Cart
                </button>
            </div>

            <div className="grid gap-4 mb-8">
                {cart.map((item, index) => (
                    <div
                        key={`${item.type}-${item.id}`}
                        className="flex flex-col lg:flex-row justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-start gap-4 flex-1">
                            <div className="relative">
                                <img
                                    src={item.image || "/api/placeholder/120/120"}
                                    alt={item.name}
                                    className="w-24 h-24 rounded-xl object-cover border-2 border-gray-100"
                                />
                                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {item.qty}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h2>
                                <p className="text-gray-500 text-sm capitalize mb-2">{item.type}</p>
                                <p className="text-2xl font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end gap-6 mt-4 lg:mt-0">
                            <div className="flex items-center border border-gray-200 rounded-xl bg-white">
                                <button
                                    onClick={() => handleQuantityChange(item.id, item.type, item.qty - 1)}
                                    disabled={item.qty <= 1}
                                    className="p-2 hover:bg-gray-50 rounded-l-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-4 py-2 text-sm font-semibold text-gray-700 min-w-12 text-center">
                                    {item.qty}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(item.id, item.type, item.qty + 1)}
                                    className="p-2 hover:bg-gray-50 rounded-r-xl transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="text-right min-w-24">
                                <p className="text-lg font-bold text-gray-900">
                                    ₹{(item.price * item.qty).toLocaleString()}
                                </p>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id, item.type)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove Item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="text-center lg:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Summary</h3>
                        <p className="text-gray-600">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'} • Total: ₹{total.toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={20} />
                            Checkout • ₹{total.toLocaleString()}
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in-90 zoom-in-90">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Delivery Information</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="space-y-3">
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={userDetails.name}
                                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        placeholder="Mobile Number"
                                        value={userDetails.mobile}
                                        onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={userDetails.email}
                                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <textarea
                                        placeholder="Full Delivery Address"
                                        value={userDetails.address}
                                        onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                                        rows={3}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleWhatsAppCheckout}
                                disabled={isSubmitting}
                                className="w-full bg-green-600 text-white py-3.5 rounded-xl hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <img src={Whatsapp} alt="WhatsApp" className="w-5 h-5" />
                                        Send Order via WhatsApp
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="px-6 pb-6">
                            <p className="text-xs text-gray-500 text-center">
                                You'll be redirected to WhatsApp to confirm your order
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;