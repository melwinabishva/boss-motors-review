import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    {
        url: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?_gl=1*dfg1mn*_ga*MTM1OTY5ODU2Mi4xNzUzMjA1MDY3*_ga_8JE65Q40S6*czE3NjAyMDA3ODkkbzQkZzEkdDE3NjAyMDA3OTAkajU5JGwwJGgw",
        caption: "Premium Automotive Tools",
        subcaption: "Professional-grade equipment for exceptional results"
    },
    {
        url: "https://images.pexels.com/photos/34171628/pexels-photo-34171628.jpeg?_gl=1*1b46je*_ga*MTM1OTY5ODU2Mi4xNzUzMjA1MDY3*_ga_8JE65Q40S6*czE3NjAyMDA3ODkkbzQkZzEkdDE3NjAyMDA4NTckajU1JGwwJGgw",
        caption: "High-Performance Parts",
        subcaption: "Engineered for durability and peak performance"
    },
    {
        url: "https://images.pexels.com/photos/248539/pexels-photo-248539.jpeg?_gl=1*b9kh9l*_ga*MTM1OTY5ODU2Mi4xNzUzMjA1MDY3*_ga_8JE65Q40S6*czE3NjAyMDA3ODkkbzQkZzEkdDE3NjAyMDA4NzUkajM3JGwwJGgw",
        caption: "Trusted by Professionals",
        subcaption: "The choice of mechanics worldwide"
    },
];

const Carousel = () => {
    const [index, setIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % images.length);
                setIsTransitioning(false);
            }, 500);
        }, 4000);

        return () => clearInterval(timer);
    }, [isHovered]);

    const navigateToSlide = (newIndex) => {
        if (isTransitioning || newIndex === index) return;

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

    const getIndicatorAnimation = (i) => {
        if (i === index) {
            return "bg-white scale-125 shadow-lg";
        }
        return "bg-white/50 hover:bg-white/70";
    };

    return (
        <section
            className="relative w-full max-w-6xl mx-auto mt-0 overflow-hidden rounded-2xl shadow-2xl group mt-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden">
                <div className="relative h-[180px] md:h-[300px]">
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${i === index
                                ? "opacity-100 scale-100 translate-x-0"
                                : i < index
                                    ? "opacity-0 -translate-x-8"
                                    : "opacity-0 translate-x-8"
                                } ${isTransitioning ? "transitioning" : ""}`}
                        >
                            <img
                                src={image.url}
                                alt={image.caption}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-start pb-6 md:pb-10 px-6 md:px-10">
                                <div className={`text-white transition-all duration-700 delay-300 transform ${i === index
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                    }`}>
                                    <h3 className="text-xl md:text-3xl font-bold drop-shadow-lg mb-1 md:mb-2">
                                        {image.caption}
                                    </h3>
                                    <p className="text-sm md:text-base text-white/80 font-medium drop-shadow">
                                        {image.subcaption}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 group-hover:opacity-100 opacity-0 md:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm"
                >
                    <ChevronLeft size={24} className="transition-transform duration-200 hover:-translate-x-0.5" />
                </button>

                <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 group-hover:opacity-100 opacity-0 md:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm"
                >
                    <ChevronRight size={24} className="transition-transform duration-200 hover:translate-x-0.5" />
                </button>
            </div>

            <div className="absolute bottom-4 w-full flex justify-center gap-3 px-4">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => navigateToSlide(i)}
                        disabled={isTransitioning}
                        className={`h-3 w-3 rounded-full transition-all duration-300 transform hover:scale-125 ${getIndicatorAnimation(i)} ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"
                            } shadow-md`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
                <div
                    className="h-full bg-gradient-to-r from-white to-white/80 transition-all duration-4000 ease-out"
                    style={{
                        width: isTransitioning && !isHovered ? '100%' : '0%',
                        transition: isTransitioning && !isHovered ? 'width 4s ease-out' : 'none'
                    }}
                    key={index}
                />
            </div>

            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {index + 1} / {images.length}
            </div>
        </section>
    );
};

export default Carousel;