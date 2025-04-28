"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserContext } from "@/context/context";
import { Menu, X, ChevronDown, LogOut, User, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ImageSlideshow from "@/components/imageSlideshow";
import GridGallery from "@/components/gridGallery";
import Highlights from "@/components/Highlights";

export default function Home() {
    const { user, logout } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Sample data for executive council slideshow - in a real app, this would come from your database
    const executiveCouncilImages = [
        { 
            url: "/Images/Frame.png", 
            caption: "Executive Council Member 1",
            description: "President" 
        },
        { 
            url: "/Images/Frame2.png", 
            caption: "Executive Council Member 2",
            description: "Vice President" 
        },
        { 
            url: "/Images/Frame3.png", 
            caption: "Executive Council Member 3",
            description: "Secretary General" 
        },
        { 
            url: "/Images/Frame4.png", 
            caption: "Executive Council Member 4",
            description: "Treasurer" 
        },
    ];

    // Sample data for highlights gallery - in a real app, this would come from your database
    const highlightsImages = [
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
        { 
            url: "/upcoming events4.jpg", 
            caption: "Innovation Workshop",
            description: "Learning new creative approaches" 
        },
        { 
            url: "/upcoming events5.jpg", 
            caption: "Award Ceremony",
            description: "Celebrating excellence in entrepreneurship" 
        },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setDropdownOpen(false);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && !e.target.closest('.mobile-menu')) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen]);

    // Helper function to check if a path matches the current page
    const isCurrentPage = (path) => {
        if (path === "home") {
            return pathname === "/";
        }
        return pathname === `/${path.replace(/\s+/g, '').toLowerCase()}`;
    };

    return (
        <div className="min-h-screen text-white">
            {/* Header Component */}
            <Header/>

            {/* Hero Section with Countdown */}
            <section className="w-full text-white pt-12 pb-24 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Logo and Tagline */}
                    <div className="flex flex-col items-center justify-center text-center mb-16 mt-8">
                        <div className="mb-6">
                            <Image 
                                src="/logo.svg" 
                                alt="logo" 
                                width={300} 
                                height={300}
                                className="max-w-[220px] sm:max-w-[280px] brightness-150"
                                priority
                            />
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-bold mb-2 tracking-tight">NUST ENTREPRENEURS CLUB</h1>
                        <div className="max-w-2xl mx-auto mt-4">
                            <p className="text-xl sm:text-2xl font-light tracking-wider mb-2">A vibrant community of innovators, dreamers, and doers ready to disrupt the status quo.</p>
                            {/* <p className="text-xl sm:text-2xl font-light tracking-wider">Grounded in Heritage.</p> */}
                        </div>
                    </div>
                    
                </div>
            </section>

            {/* About NIMUN Section */}
            <section className="w-full text-white py-16 mb-20 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center">About Us</h2>
                    <p className="text-lg leading-relaxed max-w-4xl mx-auto">
                    We are a leading technology company focused on delivering cutting-edge solutions to transform industries and businesses. Our expertise spans across various domains including Cloud Computing, AI, and Cybersecurity. NEC Technologies strives to innovate and create impactful solutions that drive change and empower businesses to achieve their goals.
                    </p>
                </div>
            </section>

            {/* Executive Council Section with Local Images */}
            <section className="w-full text-white py-16 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center">The Executive Council</h2>
                    <p className="text-lg text-center mb-16 max-w-3xl mx-auto">
                        Presenting to you, the driving force behind NEC - the Executive Council
                    </p>
                    
                    {/* Large Slideshow Container with Local Images */}
                    <div className="max-w-5xl mx-auto relative">
                        <ImageSlideshow 
                            images={executiveCouncilImages} 
                            aspectRatio="16/9"
                            autoplaySpeed={5000}
                        />
                    </div>
                </div>
            </section>

            {/* Highlights Section with Local Image Grid Gallery */}
            <Highlights/>
            

            {/* Footer styled like in the image */}
            <Footer/>
        </div>
    );
}




