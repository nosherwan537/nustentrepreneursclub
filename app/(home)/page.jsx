"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserContext } from "@/context/context";
import { Menu, X, ChevronDown, LogOut, User, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

import Header from "@/components/header";
export default function Home() {
    const { user, logout } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Define navigation items based on admin status


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


            {/* Executive Council Section with Slideshow */}
            <section className="w-full text-white py-16 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center">The Executive Council</h2>
                    <p className="text-lg text-center mb-16 max-w-3xl mx-auto">
                        Presenting to you, the driving force behind NEC - the Executive Council
                    </p>
                    
                    {/* Large Slideshow Container */}
                    <div className="max-w-5xl mx-auto relative">
                        {/* Slideshow placeholder with glass effect */}
                        <div className="aspect-[16/9] w-full bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-purple-500/10 shadow-xl shadow-purple-900/20 relative">
                            {/* Placeholder content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-900/50 to-purple-600/20 mb-6 flex items-center justify-center">
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
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10">
                                <ChevronLeft size={24} />
                            </button>
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* Highlights Section */}
            <section className="w-full text-white py-16 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-center">Highlights</h2>
                    <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
                        A glimpse into some of the key moments of this year's NEC conference
                    </p>
                    
                    {/* Highlights Slider */}
                    <div className="relative max-w-7xl mx-auto">
                        {/* Left/Right Navigation Arrows */}
                        <button className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10">
                            <ChevronLeft size={24} />
                        </button>
                        <button className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors border border-white/10">
                            <ChevronRight size={24} />
                        </button>
                        
                        {/* Slides Container */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Slide 1 */}
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-purple-900/10 z-10"></div>
                                <div className="bg-gradient-to-r from-purple-800/70 to-purple-900/70 absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-black/20 flex items-center justify-center">
                                        <p className="text-white/50 text-sm">Image 1</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                    <h3 className="text-lg font-semibold">Opening Ceremony</h3>
                                    <p className="text-sm text-white/80">The official start of NIMUN'25</p>
                                </div>
                            </div>
                            
                            {/* Slide 2 */}
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-purple-900/10 z-10"></div>
                                <div className="bg-gradient-to-r from-purple-800/70 to-purple-900/70 absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-black/20 flex items-center justify-center">
                                        <p className="text-white/50 text-sm">Image 2</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                    <h3 className="text-lg font-semibold">Panel Discussion</h3>
                                    <p className="text-sm text-white/80">Expert insights on global affairs</p>
                                </div>
                            </div>
                            
                            {/* Slide 3 */}
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-purple-900/10 z-10"></div>
                                <div className="bg-gradient-to-r from-purple-800/70 to-purple-900/70 absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-black/20 flex items-center justify-center">
                                        <p className="text-white/50 text-sm">Image 3</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                    <h3 className="text-lg font-semibold">Award Ceremony</h3>
                                    <p className="text-sm text-white/80">Celebrating excellence in diplomacy</p>
                                </div>
                            </div>
                            
                            {/* Additional slides that would be shown when scrolling */}
                            <div className="hidden relative aspect-[4/3] rounded-lg overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-purple-900/10 z-10"></div>
                                <div className="bg-gradient-to-r from-purple-800/70 to-purple-900/70 absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-black/20 flex items-center justify-center">
                                        <p className="text-white/50 text-sm">Image 4</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                    <h3 className="text-lg font-semibold">Cultural Night</h3>
                                    <p className="text-sm text-white/80">Celebrating diversity through performance</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Indicator Dots */}
                        <div className="flex justify-center mt-6 space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-white/30"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-white/30"></span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer styled like in the image */}
        <Footer/>
        </div>
    );
}




 