import React from "react";
import { Link } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { MdCallReceived } from "react-icons/md";
import { FaAmazonPay } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { TfiMoreAlt } from "react-icons/tfi";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";



const Hero = () => {
    const icons = [
        {icon: <FiSend />, value: "Send", color: 'blue'}, 
        {icon: <MdCallReceived />, value: "Receive", color: 'green'}, 
        {icon: <FaAmazonPay />, value: "Pay", color: 'indigo'}, 
        {icon: <IoStatsChart />, value: "Stats", color: 'amber'}, 
        {icon: <TfiMoreAlt />, value: "More", color: 'purple'}, 
        {icon: <AiFillThunderbolt />, value: "Quick", color: 'gray'}, 
    ]
    return (
        <section className="bg-gradient-to-br from-blue-50 to-amber-50 py-16 md:py-28 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        <span className="text-sm font-medium text-blue-600">The Future of Digital Payments</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500">Mobile Money</span> for Everyone
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Send, receive, and manage your money with unprecedented ease. XKash brings you borderless financial freedom with top-tier security.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            to="/register"
                            className="relative group bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold overflow-hidden"
                        >
                            <span className="relative z-10">Get Started for Free</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Link>
                        <Link
                            to="/login"
                            className="flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Existing User? Login
                        </Link>
                    </div>

                </div>

                <div className="md:w-1/2 flex justify-center relative">
                    <div className="relative w-full max-w-md">
                        {/* Phone mockup */}
                        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                            <div className="h-[32px] w-[148px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
                                {/* App screen content */}
                                <div className="bg-gradient-to-b from-blue-50 to-white h-full p-4 flex flex-col">
                                    <div className="flex justify-between items-center mb-8">
                                        <span className="font-bold text-blue-600">XKash</span>
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <FaUserCircle  size={24}/>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                                        <p className="text-gray-500 text-sm mb-2">Available Balance</p>
                                        <p className="text-3xl font-bold text-gray-800">$2,450.00</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-8">
                                        {icons.map((item, index) => (
                                            <button key={index} className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
                                                <div className={`w-12 h-12 rounded-full bg-${item.color}-100 flex items-center justify-center mb-2`}>
                                                    {item.icon}
                                                </div>
                                                <span className="text-xs font-medium text-gray-600">{item.value}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-auto bg-blue-600 text-white rounded-xl p-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm opacity-80">Recent Transaction</p>
                                            <p className="font-medium">Received from John</p>
                                        </div>
                                        <p className="text-lg font-bold">+$250.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;