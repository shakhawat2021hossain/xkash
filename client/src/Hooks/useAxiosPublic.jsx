import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://xkashserver.vercel.app',
    withCredentials: true
})
const useAxiosPublic = () => {
    return axiosPublic
};

axiosPublic.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 && error.response?.data?.msg === 'Session expired. Please log in again.') {
            document.cookie = 'token=; Max-Age=0; path=/;';
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);
export default useAxiosPublic;