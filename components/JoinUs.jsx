import React from 'react';
import Link from 'next/link';

const JoinUs = () => {
  return (
    <section className="w-full text-white py-16 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Background blur effect */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-600/20 rounded-full filter blur-[80px]"></div>
          
          {/* Content */}
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 relative">
            Join Us
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 mb-10">
            Be part of a vibrant community that's shaping the future of entrepreneurship at NUST
          </p>
          
          {/* Glossomorphic Button */}
          <div className="transform hover:scale-105 transition-all duration-300">
            <Link href="/register" className="inline-block py-4 px-10 bg-white/10 backdrop-blur-lg text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg border border-white/20 hover:bg-white/20 hover:border-white/30 group">
              <span className="flex items-center gap-3">
                <span className="text-lg">Register Now</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
