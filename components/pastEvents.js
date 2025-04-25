"use client";
import Image from "next/image";
import { getEventsbyType } from "@/db/EventsDB";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PastEvents() {
  const [events, setEvents] = useState([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await getEventsbyType("Past Events");
        setEvents(
          events.length > 0
            ? events
            : [
                {
                  id: 1,
                  title: "AI Description Technology Launch",
                  desc: "Our recent event showcased advanced AI that automatically describes images, text, and visual content, providing context and understanding that goes beyond the interface.",
                  imageurl: "/testingimage.svg",
                  images: [
                    "/testingimage.svg",
                    "/testingimage.svg",
                    "/testingimage.svg",
                  ],
                },
                {
                  id: 2,
                  title: "Enhanced Accessibility Workshop",
                  desc: "Our last workshop focused on customizable contrast modes, screen magnification, and keyboard navigation designed specifically for users with diverse needs.",
                  imageurl: "/testingimage.svg",
                  images: [
                    "/testingimage.svg",
                    "/testingimage.svg",
                    "/testingimage.svg",
                  ],
                },
                {
                  id: 3,
                  title: "See Images Through AI Descriptions",
                  desc: "Our advanced AI automatically described images, text, and visual content, providing context and understanding that goes beyond what you see on screen.",
                  imageurl: "/testingimage.svg",
                  images: [
                    "/testingimage.svg",
                    "/testingimage.svg",
                    "/testingimage.svg",
                  ],
                },
              ]
        );
      } catch (error) {
        console.error("Error fetching past events:", error);
      }
    }
    fetchEvents();
  }, []);

  // Track current image index for each event
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  // Initialize image indexes when events load
  useEffect(() => {
    if (events.length > 0) {
      const indexes = {};
      events.forEach((event) => {
        indexes[event.id] = 0;
      });
      setCurrentImageIndexes(indexes);
    }
  }, [events]);

  // Handle image navigation
  const nextImage = (eventId) => {
    setCurrentImageIndexes((prev) => {
      const event = events.find((e) => e.id === eventId);
      const images = event?.images || [event?.imageurl];
      return {
        ...prev,
        [eventId]: (prev[eventId] + 1) % images.length,
      };
    });
  };

  const prevImage = (eventId) => {
    setCurrentImageIndexes((prev) => {
      const event = events.find((e) => e.id === eventId);
      const images = event?.images || [event?.imageurl];
      return {
        ...prev,
        [eventId]: (prev[eventId] - 1 + images.length) % images.length,
      };
    });
  };

  // Gallery functions
  const openGallery = (event) => {
    // Combine cover image with all gallery images
    const allImages = [event.imageurl, ...(event.images || [])];
    setGalleryImages(allImages);
    setGalleryTitle(event.title || "Event Gallery");
    setCurrentGalleryIndex(0);
    setGalleryOpen(true);
    // Prevent body scrolling when gallery is open
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  if (events.length === 0) {
    return (
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
            Past Events
          </h2>
          <p className="text-center text-white/80">Loading past events...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-40 text-white text-center">
          <span className="inline-block border-b-2 border-purple-700 pb-2">
            Past Events
          </span>
        </h2>

        <div className="space-y-20 max-w-6xl mx-auto">
          {events.map((event, index) => {
            // Only use cover image for the card display
            const coverImage = event.imageurl || "/testingimage.svg";

            return (
              <div
                key={event.id || index}
                className={`flex flex-col ${
                  index % 2 !== 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-12`}
              >
                {/* Cover Image */}
                <div className="w-full md:w-4/5 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden group shadow-xl shadow-purple-950/30">
                  <div className="relative w-full h-full">
                    <Image
                      src={coverImage}
                      alt={`${event?.title || "Event"} cover image`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 text-left">
                  <div className="p-6 bg-black/10 backdrop-blur-sm rounded-xl">
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                      {event?.title || "Event Title"}
                    </h3>
                    {event?.desc.split("\\n\\n").map((para, index) => (
                      <p key={index} className="text-white/80 mb-6">
                        {para}
                      </p>
                    ))}

                    <div className="flex items-center justify-end">
                      <button 
                        onClick={() => openGallery(event)}
                        className="px-4 py-2 bg-purple-800 hover:bg-purple-700 transition-colors rounded-lg text-white"
                      >
                        View Gallery
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-screen Gallery Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
          {/* Header with title and close button */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-black/50 backdrop-blur-sm z-10">
            <h3 className="text-xl font-bold text-white">{galleryTitle}</h3>
            <button 
              onClick={closeGallery}
              className="p-2 rounded-full hover:bg-white/10 text-white"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Main image container */}
          <div className="relative w-full h-full max-w-7xl max-h-[80vh] flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image
                src={galleryImages[currentGalleryIndex] || "/testingimage.svg"}
                alt={`Gallery image ${currentGalleryIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain"
              />
            </div>
            
            {/* Navigation arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevGalleryImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextGalleryImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnails row */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center bg-black/50 backdrop-blur-sm space-x-2 overflow-x-auto">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentGalleryIndex(index)}
                className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                  index === currentGalleryIndex ? "border-purple-600 scale-110" : "border-transparent opacity-70"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-24 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {currentGalleryIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
