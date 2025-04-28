"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserContext } from "@/context/context";
import { Menu, X, ChevronDown, LogOut, User, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/header";
import JoinUs from "@/components/JoinUs";
import ImageSlideshow from "@/components/imageSlideshow";
import GridGallery from "@/components/gridGallery";
import Highlights from "@/components/Highlights";

export default function Home() {
    const { user, logout } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    // Animation on page load
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
    // Check if element should be animated based on scroll position
    const shouldAnimate = (elementOffset) => {
        return scrollY > elementOffset - window.innerHeight * 0.85;
    };

    return (
        <div className="w-full text-white relative z-10">
            {/* Animated background elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 left-10 w-1/4 h-1/4 bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-1/5 h-1/5 bg-teal-600/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Header Component */}
            <Header/>

            {/* Hero Section with Countdown */}
            <section className="w-full h-screen flex flex-col items-center justify-center text-center text-white pt-12 pb-24 relative z-10">
                <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    
                    {/* Logo and Tagline */}
                    <div className="mb-16 mt-8">
                        <h1 className="text-5xl sm:text-7xl font-bold mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white animate-text">NUST ENTREPRENEURS CLUB</h1>
                        <div className="max-w-2xl mx-auto mt-4">
                            <p className="text-xl sm:text-2xl font-light tracking-wider mb-2 text-white/80">A vibrant community of innovators, dreamers, and doers ready to disrupt the status quo.</p>
                        </div>
                    </div>
                    
                    {/* Animated down arrow */}
                    <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <svg className="w-8 h-8 text-white/70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </section>

            {/* About NIMUN Section */}
            <section className="w-full text-white py-16 mb-20 relative z-10">
                <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 transform ${shouldAnimate(300) ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <div className="relative">
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full filter blur-[50px]"></div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center relative">
                            About Us
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
                        </h2>
                    </div>
                    <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-10 text-white/90">
                    We are a leading technology company focused on delivering cutting-edge solutions to transform industries and businesses. Our expertise spans across various domains including Cloud Computing, AI, and Cybersecurity. NEC Technologies strives to innovate and create impactful solutions that drive change and empower businesses to achieve their goals.
                    </p>
                    <div className="flex justify-center">
                        <Link href="/about" className="py-3 px-8 bg-white/10 backdrop-blur-lg text-white font-medium rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 group border border-white/20 hover:bg-white/20 hover:border-white/30">
                            Learn More About Us
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>


            {/* Executive Council Section with Slideshow */}
            <section className="w-full text-white py-16 relative z-10">
                <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 transform ${shouldAnimate(800) ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    <div className="relative mb-16">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-[50px]"></div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
                            The Executive Council
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></span>
                        </h2>
                        <p className="text-lg text-center mb-16 max-w-3xl mx-auto text-white/80">
                        Presenting to you, the driving force behind NEC - the Executive Council
                    </p>
                    </div>
                    
                    {/* Large Slideshow Container */}
                    <div className="max-w-5xl mx-auto relative group">
                        {/* Slideshow placeholder with glass effect */}
                        <div className="aspect-[16/9] w-full bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-purple-500/20 shadow-xl shadow-purple-900/20 relative transition-all duration-500 group-hover:border-purple-500/40 group-hover:shadow-purple-900/30">
                            {/* Placeholder content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-900/50 to-purple-600/20 mb-6 flex items-center justify-center animate-pulse">
                                    <div className="w-16 h-16 rounded-full bg-black/40"></div>
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">Executive Council Slideshow</h3>
                                <p className="text-white/70 max-w-lg text-center mb-6">
                                    This area will display a slideshow featuring members of the Executive Council and their roles within Society.
                                </p>
                                <div className="flex space-x-2">
                                    <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></span>
                                    <span className="w-3 h-3 rounded-full bg-white/40"></span>
                                    <span className="w-3 h-3 rounded-full bg-white/40"></span>
                                    <span className="w-3 h-3 rounded-full bg-white/40"></span>
                                </div>
                            </div>
                            
                            {/* Navigation arrows */}
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ChevronLeft size={24} />
                            </button>
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>



            {/* Highlights Section */}
            <Highlights/>

            {/* Parallax scroll effect on background */}
            <div 
                className="fixed inset-0 z-[-1] opacity-20"
                style={{
                    transform: `translateY(${scrollY * 0.1}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/30 to-teal-900/30"></div>
            </div>

            {/* Join Us Section */}
            <JoinUs />

            {/* Footer styled like in the image */}
            <Footer/>
        </div>
    );
}