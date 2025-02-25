import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Shared/Loading';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth()
    const location = useLocation()

    if (isLoading) return <Loading />
    if (user) return children
    return <Navigate to='/login' state={location?.pathname} replace='true' />
};

export default PrivateRoute;