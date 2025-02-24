import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left: Brand */}
                    <div>
                        <Logo/>
                        <p className="mt-2 text-sm text-gray-200">
                            Your trusted mobile financial service.
                        </p>
                    </div>

                    {/* Center: Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#F59E0B] mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-200 hover:text-secondary transition-colors duration-300"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-200 hover:text-secondary transition-colors duration-300"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-gray-200 hover:text-secondary transition-colors duration-300"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-gray-200 hover:text-secondary transition-colors duration-300"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right: Contact/Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#F59E0B] mb-4">Support</h3>
                        <p className="text-gray-200 text-sm">
                            Email:{' '}
                            <a
                                className="hover:text-secondary transition-colors duration-300"
                            >
                                support@xkash.com
                            </a>
                        </p>
                        <p className="text-gray-200 text-sm mt-2">
                            Phone:{' '}
                            <a
                                href="tel:+8801234567890"
                                className="hover:text-secondary transition-colors duration-300"
                            >
                                +880 123 456 7890
                            </a>
                        </p>
                    </div>
                </div>

                {/* Bottom: Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-300/30 text-center">
                    <p className="text-sm text-gray-200">
                        &copy; {new Date().getFullYear()} XKash. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;