import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom'
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const TransactionsDetails = () => {
    const axiosPublic = useAxiosPublic();

    const { id } = useParams()

    const { data: transactions, isLoading, error } = useQuery({
        queryKey: ['userTransactions'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/transactions/${id}`);
            console.log(data);
            return data;
        },
    });
    // console.log(transactions);
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recent Transactions</h2>
            {transactions?.length === 0 ? (
                <p className="text-gray-600 text-center">No transactions found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Type</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Amount (Taka)</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Fee (Taka)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx._id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-800">{new Date(tx.timestamp).toLocaleString()}</td>
                                    <td className="py-3 px-4 text-gray-800 capitalize">{tx.transactionType}</td>
                                    <td className="py-3 px-4 text-gray-800">{tx.amount}</td>
                                    <td className="py-3 px-4 text-gray-800">{tx.fee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionsDetails;