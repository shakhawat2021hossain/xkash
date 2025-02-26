import React from 'react';
import { Link } from 'react-router-dom';

const Benefits = () => {
    const benefits = [
        {
            title: 'Instant Transactions',
            description: 'Send and receive money in seconds, anytime, anywhere.',
            color: '#1D4ED8',
        },
        {
            title: 'Top-Notch Security',
            description: 'Your funds and data are protected with advanced encryption.',
            color: '#10B981',
        },
        {
            title: 'User-Friendly Design',
            description: 'Navigate effortlessly with an intuitive interface.',
            color: '#F59E0B',
        },
    ];

    return (
        <section className="bg-[#F3F4F6] py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
                        Benefits of XKash
                    </h2>
                    <p className="text-lg text-[#111827]/80 max-w-2xl mx-auto">
                        Experience the advantages that make XKash the smart choice for your finances.
                    </p>
                </div>

                {/* Benefits Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
                        >
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br"
                                style={{ background: `from-${benefit.color}20 to-${benefit.color}40` }}
                            >
                                <span className="text-3xl font-bold" style={{ color: benefit.color }}>
                                    {index + 1}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#111827] mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-[#111827]/70 text-base mb-4 flex-grow">
                                {benefit.description}
                            </p>
                            <Link
                                to="/register"
                                className="text-[#1D4ED8] hover:text-[#10B981] font-medium transition-colors duration-300"
                            >
                                Learn More
                            </Link>
                        </div>
                    ))}
                </div>

            
            </div>
        </section>
    );
};

export default Benefits;