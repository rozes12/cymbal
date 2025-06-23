import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react"; // Added more icons for contact/socials

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {/* Section 1: Brand/About */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold tracking-tight">Cymbal Store</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for premium cymbals and percussion accessories. We bring you the best sounds from around the world.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition duration-300 ease-in-out text-sm">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition duration-300 ease-in-out text-sm">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition duration-300 ease-in-out text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition duration-300 ease-in-out text-sm">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition duration-300 ease-in-out text-sm">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Customer Service / Legal */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="hover:text-white transition duration-300 ease-in-out text-sm">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition duration-300 ease-in-out text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition duration-300 ease-in-out text-sm">Terms of Service</Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-white transition duration-300 ease-in-out text-sm">Sitemap</Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact & Socials */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 mb-6">
              <p className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href="mailto:info@cymbalstore.com" className="hover:text-white transition duration-300">info@cymbalstore.com</a>
              </p>
              <p className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <a href="tel:+1234567890" className="hover:text-white transition duration-300">+1 (234) 567-890</a>
              </p>
            </div>

            <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {currentYear} Cymbal Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}