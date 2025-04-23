"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUserContext } from "@/context/context";

export default function Header() {
    const { user, logout } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_MAIL;
    const navItems = isAdmin
        ? ["home", "about", "events", "highlights", "contact", "createEvent"]
        : ["home", "about", "events", "highlights", "contact"];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/logo.svg"
                            alt="NEC Logo"
                            width={120}
                            height={40}
                            className="w-auto h-8"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                href={item === "home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-neutral-600 hover:text-primary-600 font-medium
                                         transition-colors duration-200 capitalize"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Auth Button / User Menu */}
                    <div className="hidden md:block">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-2 btn-secondary"
                                >
                                    <span>{user.name?.slice(0, 5)}...</span>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 card">
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-red-600
                                                     hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/register" className="btn-primary">
                                Join Now
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-neutral-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                href={item === "home" ? "/" : `/${item.toLowerCase()}`}
                                className="block px-3 py-2 rounded-lg text-neutral-600
                                         hover:bg-primary-50 hover:text-primary-600
                                         transition-colors duration-200 capitalize"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
} 