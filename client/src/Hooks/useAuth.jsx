import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axiosPublic.get('/protected', { withCredentials: true });
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { isLoading, user };
};

export default useAuth;
