import React, { useState, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import { AuthContext } from "../../context/AuthContext";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { sliders } = useContext(AuthContext);

  // Auto slide প্রতি ২ সেকেন্ড পর
  useEffect(() => {
    if (!sliders || sliders.length === 0) return; 

    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [sliders]);

  // Next Slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliders.length);
  };

  // Previous Slide
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sliders.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-[120px] md:h-[350px] lg:h-[500px] overflow-hidden">
      {/* Slider Images */}
      {sliders.map((image, index) => (
        <div
          key={image._id || index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.imageUrl}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliders.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-yellow-500" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
