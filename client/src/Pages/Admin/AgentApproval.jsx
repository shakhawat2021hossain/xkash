import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AgentApproval = () => {
    const axiosPublic = useAxiosPublic()

    const { data: agents, isLoading, refetch } = useQuery({
        queryKey: ['agents'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/pending-agents')
            // console.log(data);
            return data
        },
    })


    const { mutateAsync } = useMutation({
        mutationFn: async ({id, approve}) => {
            const { data } = await axiosPublic.patch(`/agents/${id}`, { isApproved: approve })
            console.log(data);
            return data
        },
        onSuccess: (data) => {
            // console.log(data);
            toast.success(data?.msg || "Approved/reject successful")
            refetch()
        },
        onError: (data) => {
            toast.error(data.msg || "Action Failed")
        }
    })

    const handleApproval = async (agentId, approve) => {
        try {
            await mutateAsync({id: agentId, approve})
        } catch (err) {
            console.log(err);
        }
    };
    console.log(agents);


    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Agent Approvals</h2>
            {agents?.length === 0 ? (
                <p className="text-gray-600">No pending agent requests.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Mobile</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">NID</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents?.map(agent => (
                                <tr key={agent._id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-800">{agent.name}</td>
                                    <td className="py-3 px-4 text-gray-800">{agent.mobile}</td>
                                    <td className="py-3 px-4 text-gray-800">{agent.email}</td>
                                    <td className="py-3 px-4 text-gray-800">{agent.nid}</td>
                                    <td className="py-3 px-4 flex space-x-2">
                                        <button
                                            onClick={() => handleApproval(agent._id, true)}
                                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleApproval(agent._id, false)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AgentApproval;