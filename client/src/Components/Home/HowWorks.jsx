import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    const steps = [
        {
            title: "Sign Up",
            description: "Create your XKash account in minutes.",
            color: "#1D4ED8",
            icon: "👤", // Add an icon or use an SVG
        },
        {
            title: "Verify Identity",
            description: "Ensure security with quick KYC verification.",
            color: "#9333EA",
            icon: "🆔",
        },
        {
            title: "Fund Your Account",
            description: "Add money via bank or agent with zero fees.",
            color: "#10B981",
            icon: "💳",
        },
        {
            title: "Start Transacting",
            description: "Send money, cash out, and manage funds.",
            color: "#F59E0B",
            icon: "💸",
        },
        {
            title: "Enjoy Benefits",
            description: "Get rewards, discounts, and exclusive offers.",
            color: "#EF4444",
            icon: "🎁",
        },
    ];

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
                        How XKash Works
                    </h2>
                    <p className="text-lg text-[#111827]/80 max-w-2xl mx-auto">
                        Get started with XKash in three simple steps. It’s quick and easy!
                    </p>
                </div>

                {/* Steps Timeline */}
                <div className="relative">
                    {/* Vertical Line (Hidden on Mobile) */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#1D4ED8]/20 to-[#EF4444]/20 h-full"></div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center mb-12 md:mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Step Card */}
                            <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8">
                                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-full max-w-md text-center md:text-left border border-[#F3F4F6]">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-6"
                                        style={{ backgroundColor: `${step.color}20` }}
                                    >
                                        <span className="text-3xl" style={{ color: step.color }}>
                                            {step.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#111827] mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-[#111827]/70 text-lg">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Spacer or Connector (Visible on Desktop) */}
                            <div className="hidden md:block md:w-1/2"></div>

                            {/* Mobile Divider */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden w-1 h-12 bg-gradient-to-b from-[#1D4ED8]/20 to-[#EF4444]/20 mx-auto my-6"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mini CTA */}
                <div className="text-center mt-16">
                    <Link
                        to="/register"
                        className="bg-gradient-to-r from-[#1D4ED8] to-[#10B981] text-white px-10 py-5 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Try It Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;