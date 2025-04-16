import React from 'react';

const Features = () => {
    const features = [
        {
            title: 'Instant Transfers',
            description: 'Send money to anyone in seconds with just their phone number or email.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Easy Cash In/Out',
            description: 'Deposit or withdraw cash through our extensive agent network nationwide.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'from-green-500 to-green-600'
        },
        {
            title: 'Bill Payments',
            description: 'Pay utilities, mobile top-ups, and other bills directly from your account.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
            color: 'from-purple-500 to-purple-600'
        },
        {
            title: '24/7 Support',
            description: 'Our customer service team is always ready to assist you anytime.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            color: 'from-amber-500 to-amber-600'
        }
    ];

    return (
        <section className="relative py-16 md:py-28 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-indigo-100 opacity-15 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-white text-blue-600 font-medium shadow-sm mb-4">
                        Powerful Features
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Banking Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Simple</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need for seamless financial transactions, all in one place.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Gradient border effect on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[2px]">
                                <div className={`bg-gradient-to-br ${feature.color} w-full h-full rounded-2xl`}></div>
                            </div>

                            <div className="relative h-full">
                                {/* Icon with gradient background */}
                                <div className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 mb-6">{feature.description}</p>

                                {/* Learn more link */}
                                <a href="#" className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                                    Learn more
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats section */}
                <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">10M+</div>
                        <div className="text-gray-600">Active Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">500K+</div>
                        <div className="text-gray-600">Agents</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                        <div className="text-gray-600">Service</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-amber-600 mb-2">99.9%</div>
                        <div className="text-gray-600">Uptime</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;