import React from 'react'
import Header from './header'

const MainPage1 = () => {
  return (
    <div className="w-full text-white relative z-10">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <div className="w-full h-96 md:h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            The NUST Entrepreneurs Society (NEC) is a vibrant community of like-minded individuals passionate about entrepreneurship, innovation, and business development. We strive to cultivate a creative and collaborative environment where students and aspiring entrepreneurs can connect, share ideas, and build their entrepreneurial skills.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainPage1