"use client";
import next from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getEventsbyType } from "@/db/EventsDB";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventsHeroSection() {
  const [pastEvents, setPastEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await getEventsbyType("Past Events");
        setPastEvents(events.slice(0, 5)); // Limit to 5 events for the hero section
      } catch (error) {
        console.error("Error fetching past events:", error);
      }
    }
    fetchEvents();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === pastEvents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? pastEvents.length - 1 : prevIndex - 1
    );
  };

  if (pastEvents.length === 0) {
    return (
      <section className="relative min-h-[70vh] bg-gradient-to-br from-black via-[#1A0B38] to-purple-900/20 text-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Events</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Loading our spectacular past events...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-black via-[#1A0B38] to-purple-900/20 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">
          Events
        </h1>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-between max-w-6xl mx-auto">
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <Image 
              src={pastEvents[currentIndex]?.imageurl || "/testingimage.svg"} 
              alt={pastEvents[currentIndex]?.title || "Event"} 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 text-left">
            <div className="p-4 md:p-6 bg-black/20 backdrop-blur-sm rounded-xl ">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-300">
                {pastEvents[currentIndex]?.title || "Event Title"}
              </h2>
              <p className="text-white/90 mb-6">
                {pastEvents[currentIndex]?.desc || "Description of the event goes here."}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-1">
                  {pastEvents.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? "bg-purple-500 w-4" : "bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-purple-900/30 hover:bg-purple-900/50 transition-colors border border-purple-500/30"
                    aria-label="Previous event"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-purple-900/30 hover:bg-purple-900/50 transition-colors border border-purple-500/30"
                    aria-label="Next event"
                  >
                    <ChevronRight size={20} />
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
