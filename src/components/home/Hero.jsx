import React from "react";

const Hero = () => {
    return (
        <section
            id="home"
            className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 text-center"
        >
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                    Your Trusted Partner in Quality Hardware
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Explore a wide range of tools, materials, and accessories for
                    professionals and DIY enthusiasts.
                </p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
                    Shop Now
                </button>
            </div>
        </section>
    );
};

export default Hero;
