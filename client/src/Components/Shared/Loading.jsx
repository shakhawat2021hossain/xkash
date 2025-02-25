import React from "react";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-t-4 border-primary border-opacity-50 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-t-4 border-secondary border-opacity-75 rounded-full animate-spin animate-pulse"></div>
                </div>
                <p className="text-lg text-white font-semibold animate-pulse">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;