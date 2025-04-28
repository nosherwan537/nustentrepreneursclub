"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlideshow({ 
  images, 
  aspectRatio = "16/9",
  autoplaySpeed = 5000,
  showNavigation = true,
  showIndicators = true
}) {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Simulate loading for consistent UI behavior
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [images, autoplaySpeed]);

  // Navigation functions
  const goToNextSlide = () => {
    if (!images || images.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const goToPrevSlide = () => {
    if (!images || images.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    if (!images || images.length === 0) return;
    setCurrentSlide(index);
  };

  // Parse aspect ratio to calculate height style
  const getHeightStyle = () => {
    if (aspectRatio) {
      const [width, height] = aspectRatio.split('/').map(Number);
      if (width && height) {
        return { paddingTop: `${(height / width) * 100}%` };
      }
    }
    return { paddingTop: '56.25%' }; // Default 16:9 ratio
  };

  if (loading) {
    return (
      <div className="relative w-full bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-purple-500/10 shadow-xl shadow-purple-900/20" style={getHeightStyle()}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-white/70">Loading images...</div>
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-purple-500/10 shadow-xl shadow-purple-900/20" style={getHeightStyle()}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/70 text-center p-4">
            No images available. Please add images to the slideshow.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-xl shadow-purple-900/20 group" style={getHeightStyle()}>
      {/* Image slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={image.url}
            alt={image.caption || `Slide ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
      ))}

      {/* Caption area if needed */}
      {images[currentSlide]?.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="text-white text-lg font-medium">
            {images[currentSlide].caption}
          </div>
          {images[currentSlide]?.description && (
            <div className="text-white/80 text-sm">
              {images[currentSlide].description}
            </div>
          )}
        </div>
      )}

      {/* Navigation Arrows */}
      {showNavigation && images.length > 1 && (
        <>
          <button 
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10 opacity-0 group-hover:opacity-100 z-30"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10 opacity-0 group-hover:opacity-100 z-30"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicator Dots */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentSlide ? "bg-purple-500" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}