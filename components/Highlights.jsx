import { useState,useEffect } from "react"
import GridGallery from "./gridGallery"
import { getHighlights } from "@/db/HighlightsDB"

export default function Highlights() {
const [highlightsImages, setHighlightsImages] = useState([])
useEffect(()=>{
    async function fetchHighlights() {
        try {
            const highlights = await getHighlights()
            console.log("Fetched highlights:", highlights)
            setHighlightsImages(highlights.length > 0 ? highlights : [
                { 
                    url: "/upcoming events1.jpg", 
                    caption: "Opening Ceremony",
                    description: "The official start of the event" 
                },
                { 
                    url: "/upcoming events2.jpg", 
                    caption: "Panel Discussion",
                    description: "Expert insights on entrepreneurship" 
                },
                { 
                    url: "/upcoming events3.jpg", 
                    caption: "Networking Event",
                    description: "Building connections for success" 
                },
            ])
        } catch (error) {
            console.error("Error fetching highlights:", error)
        }
    }
    fetchHighlights()
}, [])
return (
            <section className="w-full text-white py-16 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-center">Highlights</h2>
                    <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
                        A glimpse into some of the key moments of NEC events and activities
                    </p>
                    
                    {/* Highlights Grid Gallery with Local Images */}
                    <GridGallery 
                        images={highlightsImages}
                        itemsPerPage={3}
                        aspectRatio="4/3"
                    />
                </div>
            </section>
)
}