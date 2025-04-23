"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserContext } from "@/context/context";
import { Menu, X, ChevronDown, LogOut, User, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
    const { user, logout } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Define navigation items based on admin status
    const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_MAIL;
    const navItems = isAdmin
        ? ["home", "about", "events", "create event"]
        : ["home", "about", "events"];  

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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


            <header 
                className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300
                    ${scrolled ? "py-2 bg-black/70 backdrop-blur-sm" : "py-2 bg-transparent"}`}
            >
                <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
            {/* Logo */}
                    <div className="relative z-10 flex items-center">
                        <Link href="/" className="inline-block transform hover:scale-105 transition-transform duration-300">
                <Image
                    src="/logo.svg"
                                alt="Logo"
                                width={120}
                                height={40}
                                className="object-contain w-auto h-8 sm:h-9 brightness-150"
                                priority
                            />
                        </Link>
            </div>

            {/* Mobile Menu Button */}
                    <button 
                        className="lg:hidden relative z-10 p-2 rounded-full text-white/80 hover:text-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

                    {/* Navigation Menu - Desktop */}
                    <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4">
                        <ul className="flex items-center">
                    {navItems.map((item) => (
                                <li key={item}>
                            <Link
                                        href={item === "home" ? "/" : `/${item.replace(/\s+/g, '').toLowerCase()}`}
                                        className={`relative px-3 py-2 font-medium text-sm tracking-wide uppercase
    transition-all duration-300 ease-in-out 
                                            ${isCurrentPage(item) 
                                                ? "text-white" 
                                                : "text-white/80 hover:text-white"}`}
                                    >
                                        {item === "home" ? "Home" : item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

                    {/* Mobile Navigation Menu - Fullscreen */}
                    <div 
                        className={`mobile-menu fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out lg:hidden
                            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    >
                        <div className="flex flex-col h-full justify-center items-center px-4 bg-gradient-to-br from-black via-[#1A0B38] to-purple-900/20">
                            <ul className="flex flex-col items-center space-y-6 w-full max-w-sm">
                                {navItems.map((item) => (
                                    <li key={item} className="w-full text-center">
                                        <Link
                                            href={item === "home" ? "/" : `/${item.replace(/\s+/g, '').toLowerCase()}`}
                                            className={`inline-block text-lg font-medium uppercase tracking-wider
                                                py-3 px-4 transition-all duration-300 w-full
                                                ${isCurrentPage(item)
                                                    ? "text-white bg-purple-900/20 border-l-2 border-purple-500"
                                                    : "text-white/80 hover:text-white hover:bg-purple-900/10"}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item === "home" ? "Home" : item}
                                        </Link>
                                    </li>
                                ))}
                                
                                {/* Mobile auth buttons */}
                                <li className="w-full pt-6 max-w-sm">
                {user ? (
                        <button
                                            onClick={logout}
                                            className="flex items-center justify-center w-full mx-auto space-x-2 py-3 px-4 
                                                bg-purple-900/20 text-purple-300 rounded-full font-medium
                                                hover:bg-purple-900/30 transition-colors border border-purple-900/50"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                        </button>
                                    ) : (
                                        <Link
                                            href="/register"
                                            className="flex items-center justify-center w-full mx-auto space-x-2 py-3 px-4
                                                border border-purple-500/30 text-white rounded-full font-medium uppercase tracking-wider
                                                hover:bg-purple-900/20 transition-all"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span>Register</span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Register Button - Desktop */}
                    <div className="hidden lg:block">
                        {user ? (
                            <div className="relative" onClick={(e) => {
                                e.stopPropagation();
                                setDropdownOpen(!dropdownOpen);
                            }}>
                                <button
                                    className="flex items-center space-x-2 px-4 py-2 rounded-full
                                        border border-purple-500/30 text-white/90
                                        hover:bg-purple-900/20 transition-all duration-300"
                                >
                                    <span className="font-medium text-sm uppercase tracking-wider">
                                        {user?.name?.length > 10 
                                            ? `${user.name.slice(0, 10)}...` 
                                            : user?.name}
                                    </span>
                                    <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-black/80 rounded-lg shadow-lg overflow-hidden border border-purple-500/20 animate-slideDown backdrop-blur-sm">
                                        <div className="py-2">
                                            <Link 
                                                href="/profile" 
                                                className={`flex items-center px-4 py-2 text-sm hover:bg-purple-900/20
                                                    ${pathname === "/profile" ? "text-white" : "text-white/80"}`}
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <User size={16} className="mr-2" />
                                                <span>Profile</span>
                                            </Link>
                                            <hr className="my-1 border-purple-900/20" />
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setDropdownOpen(false);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-purple-300 hover:bg-purple-900/20"
                                            >
                                                <LogOut size={16} className="mr-2" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/register"
                                className="inline-flex items-center px-5 py-2 rounded-full
                                    border border-purple-500/30 text-white uppercase tracking-wider font-medium
                                    hover:bg-purple-900/20 transition-all duration-300"
                            >
                                Register
                    </Link>
                )}
                    </div>
            </div>
        </header>

  
    );
}