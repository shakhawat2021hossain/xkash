import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Shared/Loading';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useAuth()
    // console.log(user);

    if (isLoading) return <Loading />
    if(user?.role === 'admin') return children
    return <Navigate to={'/dashboard'} />
};

export default AdminRoute;