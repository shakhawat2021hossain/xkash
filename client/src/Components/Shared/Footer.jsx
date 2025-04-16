import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaApple,
    FaGooglePlay
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Logo className="h-8" />
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering your financial freedom with secure, fast, and reliable mobile financial services.
                        </p>

                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <FaFacebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                                <FaTwitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                                <FaLinkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                                <FaInstagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-amber-400 mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { to: '/about', text: 'About Us' },
                                { to: '/features', text: 'Features' },
                                { to: '/pricing', text: 'Pricing' },
                                { to: '/blog', text: 'Blog' },
                                { to: '/careers', text: 'Careers' }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-amber-400 mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {[
                                { to: '/terms', text: 'Terms of Service' },
                                { to: '/privacy', text: 'Privacy Policy' },
                                { to: '/security', text: 'Security' },
                                { to: '/compliance', text: 'Compliance' },
                                { to: '/licenses', text: 'Licenses' }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-amber-400 mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="h-4 w-4 mt-0.5 text-amber-400" />
                                <span>123 Finance Street, Digital City, BD 1000</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaPhone className="h-4 w-4 text-amber-400" />
                                <a href="tel:+8801234567890" className="hover:text-amber-400 transition-colors">
                                    +880 123 456 7890
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaEnvelope className="h-4 w-4 text-amber-400" />
                                <a href="mailto:support@xkash.com" className="hover:text-amber-400 transition-colors">
                                    support@xkash.com
                                </a>
                            </li>
                        </ul>

                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-300 mb-3">Download App</h4>
                            <div className="space-y-3">
                                <a href="#" className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <FaApple className="h-5 w-5 mr-2" />
                                    <div className="text-left">
                                        <div className="text-xs">Download on the</div>
                                        <div className="text-sm font-medium">App Store</div>
                                    </div>
                                </a>
                                <a href="#" className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <FaGooglePlay className="h-5 w-5 mr-2" />
                                    <div className="text-left">
                                        <div className="text-xs">Get it on</div>
                                        <div className="text-sm font-medium">Google Play</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8"></div>

                {/* Bottom Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} XKash Financial Services. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <Link to="/sitemap" className="hover:text-amber-400 transition-colors">Sitemap</Link>
                        <Link to="/faq" className="hover:text-amber-400 transition-colors">FAQs</Link>
                        <Link to="/support" className="hover:text-amber-400 transition-colors">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;