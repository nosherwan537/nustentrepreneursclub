import Link from 'next/link';
import { FaFacebook, FaInstagram, FaGithub, FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-5 font-sans">
      <div className="max-w-screen-xl mx-auto">
        {/* Copyright Text */}
        <div className="text-center mb-8">
          <p className="text-gray-400">© 2024 NUST Entrepreneurs Club. All rights reserved.</p>
        </div>
        
        {/* Connect Section */}
        <div className="text-center mb-8">
          <h4 className="text-xl font-semibold mb-6">Connect</h4>
          <div className="flex justify-center space-x-6">
            <a href="https://www.linkedin.com/company/nust-entrepreneurs-club/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin size={24} />
            </a>
            {/* <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub size={24} />
            </a> */}
            <a href="mailto:nustentrepreneursclub@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <FaEnvelope size={24} />
            </a>
            <a href="tel:+123456789" className="text-gray-400 hover:text-white transition-colors">
              <FaPhone size={24} />
            </a>
          </div>
        </div>
        
        {/* Organization Info */}
        <div className="text-center">
          <p className="text-gray-400">NUST Entrepreneurs Club @ NUST, H-12 ISLAMABAD</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://www.facebook.com/NEC.NUST/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/nustentrepreneursclub/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
