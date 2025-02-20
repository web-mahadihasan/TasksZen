import { Toaster } from "@/components/ui/toaster";
import TaskPage from "../pages/TaskPage/TaskPage";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const Layouts = () => {
  return (
    <div className="w-screen h-screen relative font-inter">
      <Toaster />
      <Sidebar />
      <Navbar />
      <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layouts;
