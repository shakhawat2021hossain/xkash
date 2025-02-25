import React from 'react';

const Features = () => {
    const features = [
        {
            title: 'Send Money',
            description: 'Transfer funds to anyone instantly with just a phone number.',
            color: '#1D4ED8', // Blue
        },
        {
            title: 'Cash In',
            description: 'Add money to your XKash account through trusted agents.',
            color: '#10B981', // Green
        },
        {
            title: 'Cash Out',
            description: 'Withdraw cash anytime via authorized agents with ease.',
            color: '#F59E0B', // Amber
        },
        {
            title: 'Balance Inquiry',
            description: 'Check your funds securely with a single click.',
            color: '#1D4ED8', // Blue (reused for balance)
        },
    ];

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
                        Why Choose XKash?
                    </h2>
                    <p className="text-lg text-[#111827]/80 max-w-2xl mx-auto">
                        Discover the features that make managing your money fast, secure, and simple.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#F3F4F6] p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                                style={{ backgroundColor: `${feature.color}20` }} // 20% opacity
                            >
                                <span className="text-2xl font-bold" style={{ color: feature.color }}>
                                    {index + 1}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#111827] mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-[#111827]/70 text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;