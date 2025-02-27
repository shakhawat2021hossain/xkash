import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Transactions = () => {
    const axiosPublic = useAxiosPublic();

    const { data: transactions, isLoading, error } = useQuery({
        queryKey: ['userTransactions'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/transactions');
            return data;
        },
    });

    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message || 'Failed to load transactions'}</p>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Last 100 Transactions</h2>
            {transactions?.length === 0 ? (
                <p className="text-gray-600 text-center">No transactions found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Type</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Sender</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Receiver</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Amount (Taka)</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Fee (Taka)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx._id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-800">{new Date(tx.timestamp).toLocaleString()}</td>
                                    <td className="py-3 px-4 text-gray-800 capitalize">{tx.transactionType}</td>
                                    <td className="py-3 px-4 text-gray-800">{tx.sender?.name} ({tx.sender?.mobile})</td>
                                    <td className="py-3 px-4 text-gray-800">{tx.receiver?.name} ({tx.receiver?.mobile})</td>
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

export default Transactions;