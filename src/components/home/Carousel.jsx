import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    {
        url: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?_gl=1*dfg1mn*_ga*MTM1OTY5ODU2Mi4xNzUzMjA1MDY3*_ga_8JE65Q40S6*czE3NjAyMDA3ODkkbzQkZzEkdDE3NjAyMDA3OTAkajU5JGwwJGgw",
        caption: "Premium Automotive Tools",
    },
    {
        url: "https://images.pexels.com/photos/34171628/pexels-photo-34171628.jpeg?_gl=1*1b46je*_ga*MTM1OTY5ODU2Mi4xNzUzMjA1MDY3*_ga_8JE65Q40S6*czE3NjAyMDA3ODkkbzQkZzEkdDE3NjAyMDA4NTckajU1JGwwJGgw",
        caption: "High-Performance Parts",
    },
    {
        url: "https://images.pexels.com/photos/248539/pexels-photo-248539.jpeg?_gl=1*b9kh9l*_ga*MTM1OTY5ODU2Mi4xNzUzMjA1MDY3*_ga_8JE65Q40S6*czE3NjAyMDA3ODkkbzQkZzEkdDE3NjAyMDA4NzUkajM3JGwwJGgw",
        caption: "Trusted by Professionals",
    },
];

const Carousel = () => {
    const [index, setIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Enhanced auto-slide with animation control
    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % images.length);
                setIsTransitioning(false);
            }, 500); // Match this with CSS transition duration
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    // Enhanced manual navigation with animation
    const navigateToSlide = (newIndex) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setIndex(newIndex);
            setIsTransitioning(false);
        }, 500);
    };

    const prevSlide = () => {
        const newIndex = (index - 1 + images.length) % images.length;
        navigateToSlide(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (index + 1) % images.length;
        navigateToSlide(newIndex);
    };

    // Slide indicator animation
    const getIndicatorAnimation = (i) => {
        if (i === index) {
            return "bg-white scale-125";
        }
        return "bg-white/50 hover:bg-white/70";
    };

    return (
        // Carousel
        <section className="relative w-full max-w-6xl mx-auto mt-0 overflow-hidden rounded-2xl shadow-lg group">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
                {/* Images with enhanced transitions */}
                <div className="relative h-[180px] md:h-[300px]">
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${i === index
                                ? "opacity-100 scale-100 translate-x-0"
                                : i < index
                                    ? "opacity-0 -translate-x-full"
                                    : "opacity-0 translate-x-full"
                                } ${isTransitioning ? "transitioning" : ""}`}
                        >
                            <img
                                src={image.url}
                                alt={image.caption}
                                className="w-full h-full object-cover"
                            />

                            {/* Enhanced overlay with fade-in animation */}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <h3 className={`text-white text-lg md:text-2xl font-semibold drop-shadow-lg transition-all duration-700 ${i === index
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                                    }`}>
                                    {image.caption}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 group-hover:opacity-100 opacity-0 md:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={20} className="transition-transform duration-200 hover:-translate-x-0.5" />
                </button>

                <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 group-hover:opacity-100 opacity-0 md:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={20} className="transition-transform duration-200 hover:translate-x-0.5" />
                </button>
            </div>

            {/* Enhanced Indicator Dots */}
            <div className="absolute bottom-4 w-full flex justify-center gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => navigateToSlide(i)}
                        disabled={isTransitioning}
                        className={`h-2 w-2 rounded-full transition-all duration-300 transform hover:scale-125 ${getIndicatorAnimation(i)
                            } ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"}`}
                    />
                ))}
            </div>

            {/* Progress Bar for Auto-slide */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
                <div
                    className="h-full bg-white/80 transition-all duration-3000 ease-linear"
                    style={{
                        width: isTransitioning ? '100%' : '0%',
                        transition: isTransitioning ? 'width 3s linear' : 'none'
                    }}
                    key={index} // Force re-render on slide change
                />
            </div>
        </section>
    );
};

export default Carousel;