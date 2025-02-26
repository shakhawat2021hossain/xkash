// src/components/AdminDashboard.jsx
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch admin stats
    const { data: stats, isLoading, error } = useQuery({
        queryKey: ['systemStats'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/system-stats');
            console.log('System stats:', data);
            return data;
        },
    });

    // Chart data for Admin Income (Bar Chart)
    const incomeChartData = {
        labels: ['Admin Income'],
        datasets: [
            {
                label: 'Income (Taka)',
                data: [stats?.adminIncome || 0],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const incomeChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Admin Current Income' },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Taka' },
            },
        },
    };

    // Chart data for Total Money in System (Pie Chart)
    const systemMoneyChartData = {
        labels: ['Total Money in System'],
        datasets: [
            {
                label: 'Total Money (Taka)',
                data: [stats?.totalMoneyInSystem || 0],
                backgroundColor: ['rgba(54, 162, 235, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const systemMoneyChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Total Money in System' },
        },
    };

    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message || 'Failed to load stats'}</p>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Admin Income Card */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Current Income</h3>
                    <p className="text-2xl font-bold text-green-600 mb-4">{stats?.adminIncome || 0} Taka</p>
                    <div className="h-64">
                        <Bar data={incomeChartData} options={incomeChartOptions} />
                    </div>
                </div>

                {/* Total Money in System Card */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Money in System</h3>
                    <p className="text-2xl font-bold text-blue-600 mb-4">{stats?.totalMoneyInSystem || 0} Taka</p>
                    <div className="h-64">
                        <Pie data={systemMoneyChartData} options={systemMoneyChartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;