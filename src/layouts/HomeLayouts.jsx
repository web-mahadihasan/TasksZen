import { Outlet } from "react-router";

const HomeLayouts = () => {
    return (
        <div className="min-h-screen w-full font-inter">
            <Outlet/>
        </div>
    );
};

export default HomeLayouts;