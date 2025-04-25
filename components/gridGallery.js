"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GridGallery({ 
  images, 
  itemsPerPage = 3,
  aspectRatio = "4/3" 
}) {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Simulate loading for consistent UI behavior
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Calculate total pages
  const totalPages = !images ? 0 : Math.ceil(images.length / itemsPerPage);
  
  // Get current page items
  const currentImages = !images ? [] : images.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  // Navigation functions
  const nextPage = () => {
    if (!images || totalPages <= 1) return;
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    if (!images || totalPages <= 1) return;
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex) => {
    if (!images || totalPages <= 1) return;
    setCurrentPage(pageIndex);
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(itemsPerPage)].map((_, index) => (
            <div 
              key={index}
              className={`relative aspect-[${aspectRatio}] rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-black/20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full rounded-xl bg-black/30 p-8 text-center">
        <p className="text-white/70">
          No images available. Please add images to the gallery.
        </p>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Left/Right Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <button 
            onClick={prevPage} 
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10"
            aria-label="Previous page"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextPage}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10"
            aria-label="Next page"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Slides Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentImages.map((image, index) => (
          <div key={index} className={`relative aspect-[${aspectRatio}] rounded-lg overflow-hidden group`}>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-purple-900/10 z-10"></div>
            <Image
              src={image.url}
              alt={image.caption || `Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-lg font-semibold">{image.caption || `Highlight ${index + 1}`}</h3>
              <p className="text-sm text-white/80">{image.description || ''}</p>
            </div>
          </div>
        ))}

        {/* Fill empty slots with placeholders if needed */}
        {currentImages.length < itemsPerPage && 
          [...Array(itemsPerPage - currentImages.length)].map((_, index) => (
            <div 
              key={`empty-${index}`} 
              className={`relative aspect-[${aspectRatio}] rounded-lg overflow-hidden bg-gradient-to-r from-purple-800/30 to-purple-900/30`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/30 text-sm">No image</p>
              </div>
            </div>
          ))
        }
      </div>
      
      {/* Indicator Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                index === currentPage ? "bg-purple-500" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}