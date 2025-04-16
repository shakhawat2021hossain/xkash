import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useBalance from '../../Hooks/useBalance';

const CashOut = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const {refetch} = useBalance()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async (transaction) => {
            const { data } = await axiosPublic.post('/cash-out', transaction)
            return data
        },
        onSuccess: async () => {
            toast.success("Cashout Successful")
            refetch()
            navigate('/')
        }
    })
    const onSubmit = async (data) => {
        // console.log(data);
        try {
            await mutateAsync(data)

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Cash Out</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="agentMobile" className="block text-sm font-medium text-[#111827] mb-1">
                            Agent Mobile Number
                        </label>
                        <input
                            type="text"
                            id="agentMobile"
                            {...register("agentMobile", {
                                required: "Recipient mobile number is required",
                                pattern: {
                                    value: /^\d{11}$/,
                                    message: "Enter a valid 11-digit mobile number starting with 01",
                                },
                            })}
                            placeholder="017xxxxxxxx"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] ${errors.agentMobile ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.agentMobile && (
                            <p className="text-red-500 text-xs mt-1">{errors.agentMobile.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-[#111827] mb-1">
                            Amount (Taka)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            {...register("amount", {
                                required: "Amount is required",
                                min: { value: 50, message: "Minimum amount is 50 Taka" },
                                valueAsNumber: true,
                            })}
                            placeholder="Minimum 50 Taka"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] ${errors.amount ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="pin" className="block text-sm font-medium text-[#111827] mb-1">
                            Pin
                        </label>
                        <input
                            type="password"
                            id="pin"
                            {...register("pin", {
                                required: "pin is required",
                                pattern: {
                                    value: /^\d{5}$/,
                                    message: 'PIN must be exactly 5 digits',
                                },
                            })}
                            placeholder="*****"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] ${errors.pin ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.pin && (
                            <p className="text-red-500 text-xs mt-1">{errors.pin.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-[#1D4ED8] text-white py-3 rounded-lg hover:bg-[#F59E0B] transition-all duration-300 font-semibold ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
                            }`}
                    >
                        {isLoading ? "Loading..." : "Cash Out"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CashOut;