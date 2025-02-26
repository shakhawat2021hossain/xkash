import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useBalance from '../../Hooks/useBalance';

const CashIn = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { refetch } = useBalance()
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async (transaction) => {
            const { data } = await axiosPublic.post('/cash-in', transaction)
            // console.log(data);
            return data;
        },
        onSuccess: async () => {
            toast.success("Cash In Successfull");
            await refetch();
            navigate('/')
        }

    })

    // Handle form submission
    const onSubmit = async (data) => {
        // console.log(data);
        try {
            await mutateAsync(data)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Cash-In for User</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* User Mobile Number */}
                <div>
                    <label htmlFor="userMobile" className="block text-sm font-medium text-gray-700">
                        User Mobile Number
                    </label>
                    <input
                        id="userMobile"
                        type="text"
                        {...register('userMobile', {
                            required: 'Mobile number is required',
                            pattern: {
                                value: /^\d{11}$/,
                                message: 'Enter a valid 11-digit mobile number (e.g., 01712345678)',
                            },
                        })}
                        className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.userMobile ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="01712345678"
                    />
                    {errors.userMobile && (
                        <p className="mt-1 text-sm text-red-600">{errors.userMobile.message}</p>
                    )}
                </div>

                {/* Amount */}
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount (Taka)
                    </label>
                    <input
                        id="amount"
                        type="number"
                        {...register('amount', {
                            required: 'Amount is required',
                            min: { value: 1, message: 'Amount must be at least 1 Taka' },
                        })}
                        className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.amount ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter amount"
                    />
                    {errors.amount && (
                        <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                    )}
                </div>

                {/* PIN */}
                <div>
                    <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
                        Your PIN
                    </label>
                    <input
                        id="pin"
                        type="password"
                        {...register('pin', {
                            required: 'PIN is required',
                            pattern: {
                                value: /^\d{5}$/,
                                message: 'PIN must be a 5-digit number',
                            },
                        })}
                        className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.pin ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter your 5-digit PIN"
                        maxLength="5"
                    />
                    {errors.pin && (
                        <p className="mt-1 text-sm text-red-600">{errors.pin.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                >
                    {isLoading ? 'Processing...' : 'Cash In'}
                </button>
            </form>


        </div>
    );
};

export default CashIn;