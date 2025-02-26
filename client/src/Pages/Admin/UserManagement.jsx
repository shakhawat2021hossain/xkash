import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const UserManagement = () => {
    const axiosPublic = useAxiosPublic()
    const [filter, setFilter] = useState("")
    const [search, setSearch] = useState("")
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/users')
            // console.log(data);
            return data
        }
    })

    const handleSearch = async (e) => {
        e.preventDefault()
        const search = e.target.search.value;
        setSearch(search)
    }
    const handleReset = () => {
        setSearch("")
        setFilter("")
    }
    const { mutateAsync, isLoading: toggling } = useMutation({
        mutationFn: async ({id, isBlocked}) => {
            const { data } = await axiosPublic.patch(`/user/${id}`, {isBlocked})
            // console.log(data);
            return data
        },
        onSuccess: (data) => {
            // console.log(data);
            toast.success(data?.msg || "Blocked/unblocked successful")
            refetch()
        },
        onError: (data)=>{
            toast.error(data.msg || "Action Failed")
        }
    })
    const handleToggleBlock = async (id, currentStatus) => {
        await mutateAsync({ id, isBlocked: !currentStatus });
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">User Management</h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
                <select
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                    name="category"
                    id="category"
                    className="w-full md:w-auto bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">All</option>
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                </select>

                <form onSubmit={handleSearch} className="w-full md:w-auto flex">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search by mobile"
                        className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-l-lg text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <button
                        type="submit"
                        className="px-4 py-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Search
                    </button>
                </form>



                <button
                    onClick={handleReset}
                    className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                    Reset
                </button>
            </div>


            {/* User Table */}
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-indigo-600 text-white">
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Mobile</th>
                                <th className="p-2 text-left">Role</th>
                                <th className="p-2 text-left">Balance</th>
                                <th className="p-2 text-left">Income</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="border-b hover:bg-gray-50">
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.mobile}</td>
                                        <td className="p-2">{user.role}</td>
                                        <td className="p-2">{user.balance} Taka</td>
                                        <td className="p-2">{user.income || 0} Taka</td>
                                        <td className="p-2">
                                            {user.isBlocked ? (
                                                <span className="text-red-600">Blocked</span>
                                            ) : (
                                                <span className="text-green-600">Active</span>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => handleToggleBlock(user?._id, user?.isBlocked)}
                                                disabled={toggling}
                                                className={`py-1 px-3 rounded-md text-white ${user.isBlocked
                                                    ? 'bg-green-600 hover:bg-green-700'
                                                    : 'bg-red-600 hover:bg-red-700'
                                                    } 
                                                    ${toggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {user?.isBlocked ? 'Unblock' : 'Block'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-4 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserManagement;