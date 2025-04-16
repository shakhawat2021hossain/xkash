import React from 'react';
import useAuth from '../Hooks/useAuth';
import { FiUser, FiPhone, FiMail, FiShield, FiDollarSign, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';
import { MdOutlineSecurity, MdOutlineAccountBalanceWallet } from 'react-icons/md';

const Profile = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="space-y-3 w-64">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const getStatusDetails = () => {
        if (user.isBlocked) {
            return { text: 'Blocked', color: 'red', icon: <FiAlertCircle className="text-red-500" /> };
        }
        if (!user.isApproved && user.role === 'agent') {
            return { text: 'Pending Approval', color: 'yellow', icon: <FiClock className="text-yellow-500" /> };
        }
        return { text: 'Active', color: 'green', icon: <FiCheckCircle className="text-green-500" /> };
    };

    const status = getStatusDetails();

    return (
        <div className="max-w-2xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
                    <div className="mx-auto h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-4">
                        <FiUser className="h-12 w-12 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <p className="text-blue-100 mt-1 capitalize">{user.role}</p>
                </div>

                {/* Profile Details */}
                <div className="p-6 sm:p-8">
                    <div className="space-y-5">
                        {/* Account Information Section */}
                        <div className="border-b pb-5">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                                <MdOutlineSecurity className="mr-2 text-blue-500" />
                                Account Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Mobile */}
                                <div className="flex items-start">
                                    <div className="bg-blue-50 p-2 rounded-lg mr-3">
                                        <FiPhone className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Mobile Number</p>
                                        <p className="font-medium">{user.mobile}</p>
                                    </div>
                                </div>

                                {/* Email */}
                                {user.email && (
                                    <div className="flex items-start">
                                        <div className="bg-blue-50 p-2 rounded-lg mr-3">
                                            <FiMail className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email Address</p>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Role */}
                                <div className="flex items-start">
                                    <div className="bg-blue-50 p-2 rounded-lg mr-3">
                                        <FiShield className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Account Type</p>
                                        <p className="font-medium capitalize">{user.role}</p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-start">
                                    <div className="bg-blue-50 p-2 rounded-lg mr-3">
                                        {status.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Account Status</p>
                                        <p className={`font-medium text-${status.color}-500`}>
                                            {status.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Information Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                                <MdOutlineAccountBalanceWallet className="mr-2 text-blue-500" />
                                Financial Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Balance */}
                                <div className="flex items-start">
                                    <div className="bg-blue-50 p-2 rounded-lg mr-3">
                                        <FiDollarSign className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Available Balance</p>
                                        <p className="font-medium">{user.balance.toLocaleString()} Taka</p>
                                    </div>
                                </div>

                                {/* Additional financial info can be added here */}
                                <div className="flex items-start">
                                    <div className="bg-blue-50 p-2 rounded-lg mr-3">
                                        <FiDollarSign className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Transactions</p>
                                        <p className="font-medium">1,245</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                            Edit Profile
                        </button>
                        <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-lg font-medium transition duration-200">
                            Change Password
                        </button>
                        {user.role === 'agent' && !user.isApproved && (
                            <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                                Resubmit Documents
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            {/* <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                <FiDollarSign className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">Money Sent to +88017XXXXXX{i + 1}</p>
                                <p className="text-sm text-gray-500">Today at {10 + i}:30 AM</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-red-500">- 1,000 Taka</p>
                                <p className="text-sm text-gray-500">Completed</p>
                            </div>
                        </div>
                    ))}
                    <button className="w-full py-2 text-blue-600 hover:text-blue-800 font-medium">
                        View All Activity
                    </button>
                </div>
            </div> */}
        </div>
    );
};

export default Profile;