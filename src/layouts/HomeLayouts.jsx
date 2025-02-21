import { Outlet } from "react-router";
import { Toaster } from 'react-hot-toast';

const HomeLayouts = () => {
    return (
        <div className="min-h-screen w-full font-inter">
            <Toaster/>
            <Outlet/>
        </div>
    );
};

export default HomeLayouts;