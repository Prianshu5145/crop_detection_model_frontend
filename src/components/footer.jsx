import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-10">
            <div className="container mx-auto px-4">
                
                {/* Logo and About Section */}
                <div className="mb-8">
                    <h2 className="text-3xl text-white font-bold mb-3">Kisan Saathi</h2>
                    <p className="text-blue-100 leading-relaxed max-w-2xl">
                        Kisan Saathi empowers farmers with AI crop detection, mandi prices, 
                        health center search, and accurate weather updates — making farming 
                        smarter, faster, and more reliable.
                    </p>
                </div>

                {/* Explore & Contact Sections */}
                <div className="flex flex-wrap gap-8 justify-between items-start mb-0">
                    
                    {/* Explore Links */}
                    <div className="w-full sm:w-1/2 flex-1">
                        <h3 className="text-xl text-white font-semibold mb-3">Explore</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-blue-300 transition">Home</a></li>
                            <li><a href="/services" className="hover:text-blue-300 transition">Services</a></li>
                            <li><a href="/about" className="hover:text-blue-300 transition">About Us</a></li>
                            <li><a href="/contact" className="hover:text-blue-300 transition">Contact</a></li>
                            <li><a href="/privacy-policy" className="hover:text-blue-300 transition">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-blue-300 transition">Terms & Conditions</a></li>
                        </ul>
                        <br />
                    </div>

                    {/* Contact Section */}
                    <div className="w-full sm:w-1/2 flex-1">
                        <h3 className="text-xl text-white font-semibold mb-3">Get in Touch</h3>
                        <p className="text-blue-100">
                            Email:
                            <a 
                                href="mailto:support@kisansaathi.in"
                                className="ml-1 hover:text-blue-300 transition"
                            >
                                support@kisansaathi.in
                            </a>
                        </p>
                        <p className="mt-2 text-blue-100">
                            Phone:
                            <a 
                                href="tel:+919876543210"
                                className="ml-1 hover:text-blue-300 transition"
                            >
                                +91 9119913441
                            </a>
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white mt-6 pt-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        
                        {/* Copyright */}
                        <div>
                            <p className="text-white text-sm">
                                © {new Date().getFullYear()} Kisan Saathi. All rights reserved.
                            </p>
                            <p className="text-blue-200 text-sm">
                                Made with ❤️ in India 🇮🇳
                            </p>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex space-x-6">
                            <a href="/" className="hover:text-blue-300 transition">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="/" className="hover:text-blue-300 transition">
                                <FaTwitter size={20} />
                            </a>
                            <a href="/" className="hover:text-blue-300 transition">
                                <FaInstagram size={20} />
                            </a>
                            <a href="/" className="hover:text-blue-300 transition">
                                <FaLinkedinIn size={20} />
                            </a>
                            <a href="/" className="hover:text-blue-300 transition">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
