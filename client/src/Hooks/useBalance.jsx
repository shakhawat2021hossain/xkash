import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useBalance = () => {
    const axiosPublic = useAxiosPublic();

    const { data: balance, refetch } = useQuery({
        queryKey: ['balance'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/balance');
            // console.log(data);
            return data.balance;
        },
    });

    return { balance, refetch };
};

export default useBalance;
