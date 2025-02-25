import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Shared/Loading";

const Main = () => {
    const {isLoading} = useAuth()
    if(isLoading) return <Loading/>
    return (
        <div>
            <Navbar />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer/>

        </div>
    );
};

export default Main;