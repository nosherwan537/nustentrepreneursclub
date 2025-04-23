"use client";
import Image from "next/image";
import { getEventsbyType } from "@/db/EventsDB";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UpComingEvents() {
  const [events, setEvents] = useState([]);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await getEventsbyType("Upcoming Events");
        setEvents(events.length > 0 ? events.slice(0, 1) : [
          {
            id: 1,
            title: "Voice Control Technology Showcase",
            desc: "Join us for a demonstration of cutting-edge voice recognition technology that enhances accessibility and user experience. Learn how to navigate with your voice using advanced features.",
            imageurl: "/testingimage.svg",
            images: ["/testingimage.svg", "/testingimage.svg", "/testingimage.svg"]
          }
        ]);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    }
    fetchEvents();
  }, []);

  // Initialize image indexes when events load
  useEffect(() => {
    if (events.length > 0) {
      const indexes = {};
      events.forEach(event => {
        indexes[event.id] = 0;
      });
      setCurrentImageIndexes(indexes);
    }
  }, [events]);

  // Handle image navigation
  const nextImage = (eventId) => {
    setCurrentImageIndexes(prev => {
      const event = events.find(e => e.id === eventId);
      const images = event?.images || [event?.imageurl];
      return {
        ...prev,
        [eventId]: (prev[eventId] + 1) % images.length
      };
    });
  };

  const prevImage = (eventId) => {
    setCurrentImageIndexes(prev => {
      const event = events.find(e => e.id === eventId);
      const images = event?.images || [event?.imageurl];
      return {
        ...prev,
        [eventId]: (prev[eventId] - 1 + images.length) % images.length
      };
    });
  };

  if (events.length === 0) {
    return (
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">Upcoming Event</h2>
          <p className="text-center text-white/80">Loading upcoming events...</p>
        </div>
      </section>
    );
  }

  const event = events[0];
  const images = event.images || [event.imageurl];
  const currentImageIndex = currentImageIndexes[event.id] || 0;

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-6xl font-bold mb-20 text-white text-center ">
          <span className="inline-block border-b-2 border-purple-700 pb-2 ">Upcoming Event</span>
        </h2>
        
        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center mb-20 gap-4 sm:gap-8 md:gap-16 text-center">
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-8xl font-bold">00</span>
            <span className="text-sm sm:text-base uppercase tracking-wider mt-1">Months</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-8xl font-bold">00</span>
            <span className="text-sm sm:text-base uppercase tracking-wider mt-1">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-8xl font-bold">00</span>
            <span className="text-sm sm:text-base uppercase tracking-wider mt-1">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-8xl font-bold">00</span>
            <span className="text-sm sm:text-base uppercase tracking-wider mt-1">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-8xl font-bold">00</span>
            <span className="text-sm sm:text-base uppercase tracking-wider mt-1">Seconds</span>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Image Slider */}
            <div className="w-full md:w-4/5 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden group shadow-xl shadow-purple-950/30 ">
              <div className="relative w-full h-full">
                <Image 
                  src={images[currentImageIndex] || "/testingimage.svg"} 
                  alt={`${event?.title || "Event"} image ${currentImageIndex + 1}`}
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => prevImage(event.id)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => nextImage(event.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {images.map((_, imgIndex) => (
                      <button 
                        key={imgIndex}
                        onClick={() => setCurrentImageIndexes(prev => ({ ...prev, [event.id]: imgIndex }))}
                        className={`w-2 h-2 rounded-full transition-all ${
                          imgIndex === currentImageIndex ? "bg-purple-600 w-4" : "bg-white/50"
                        }`}
                        aria-label={`Go to image ${imgIndex + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Content Side */}
            <div className="w-full md:w-1/2 text-left">
              <div className="p-6 bg-black/40 backdrop-blur-sm rounded-xl">
                <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white ">
                  {event?.title || "Event Title"}
                </h3>
                <p className="text-white/80 mb-6">
                  {event?.desc || "Description of the event goes here."}
                </p>
                
                <div className="flex items-center justify-end">
                  <button className="px-4 py-2 bg-purple-800 hover:bg-purple-700 transition-colors rounded-lg text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
