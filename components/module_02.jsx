import React from "react";

const AboutSection = () => {
  return (
    <section className="w-full text-white py-16 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              Empowering Innovators to Build the Future
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center sm:text-left">
                Who We Are
              </h3>
              <p className="text-lg leading-relaxed">
                The NUST Entrepreneurs Society (NEC) is a vibrant community of like-minded individuals passionate about entrepreneurship, innovation, and business development. We strive to cultivate a creative and collaborative environment where students and aspiring entrepreneurs can connect, share ideas, and build their entrepreneurial skills.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center sm:text-left">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed">
                Our mission is to foster an entrepreneurial mindset among NUST students, providing them with the tools, resources, and opportunities they need to succeed. We aim to create a supportive ecosystem that encourages innovation, promotes networking, and helps students build valuable business skills. Through mentorship programs, entrepreneurship challenges, and collaborative events, we inspire and guide the entrepreneurs of tomorrow.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center sm:text-left">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed">
                We aim to become a leading platform for nurturing entrepreneurship within the NUST community, empowering students to become successful business leaders and innovators. By creating a culture of creativity and problem-solving, members can turn their entrepreneurial dreams into reality. With a focus on sustainable business practices and social impact, we hope to contribute positively to the entrepreneurial landscape in Pakistan and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;