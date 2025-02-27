import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../Components/Shared/Loading";
import { useNavigate } from "react-router-dom";
import useBalance from "../../Hooks/useBalance";

const SendMoney = () => {
    const navigate = useNavigate()
    const { refetch } = useBalance()
    const { user, isLoading: loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Send money 
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async (transaction) => {
            const { data } = await axiosPublic.post("/send-money", transaction);
            // console.log(data);
            return data;
        },
        onSuccess: (data) => {
            toast.success(`Money sent successfully! Transaction ID: ${data.transactionId}`);
            refetch()
            navigate('/')
            reset();
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to send money");
        },
    });

    // Handle form submission
    const onSubmit = async (data) => {
        const { amount, recipientMobile } = data;
        try{

            if (amount < user?.balance) {
                await mutateAsync({ amount, recipientMobile });
    
            }
            else if (user?.balance < amount) {
                toast.error("Don't have sufficient amount")
            }
        }
        catch(err){
            console.log(err);
        }
    };

    if (loading) return <Loading />


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#111827] mb-6 text-center">Send Money</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="recipientMobile" className="block text-sm font-medium text-[#111827] mb-1">
                            Recipient Mobile Number
                        </label>
                        <input
                            type="text"
                            id="recipientMobile"
                            {...register("recipientMobile", {
                                required: "Recipient mobile number is required",
                                pattern: {
                                    value: /^\d{11}$/,
                                    message: "Enter a valid 11-digit mobile number starting with 01",
                                },
                            })}
                            placeholder="017xxxxxxxx"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] ${errors.recipientMobile ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.recipientMobile && (
                            <p className="text-red-500 text-xs mt-1">{errors.recipientMobile.message}</p>
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
                        <p className="text-xs text-gray-500 mt-1">
                            Fee: 5 Taka for transactions over 100 Taka
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-[#1D4ED8] text-white py-3 rounded-lg hover:bg-[#F59E0B] transition-all duration-300 font-semibold ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
                            }`}
                    >
                        {isLoading ? "Sending..." : "Send Money"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendMoney;