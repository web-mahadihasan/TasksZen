import { Toaster } from "@/components/ui/toaster";
import TaskPage from "../pages/TaskPage/TaskPage";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import { TaskProvider } from "../contexts/TaskContext";
import useAuth from "../hooks/useAuth";

const Layouts = () => {
  const {openSidebar} = useAuth()

  return (
    <div className="w-screen h-screen relative font-inter">
      <TaskProvider>
      <Toaster />
      <aside className={`absolute  lg:static ${openSidebar ? "top-0 left-0" : "-left-[500px]"} `}>
        <Sidebar />
      </aside>
      <Navbar />
      {/* md:pl-[250px] pl-[60px] */}
      <main className="px-4 pr-[20px] pt-[70px] w-full h-full overflow-y-auto lg:pl-[250px]">
        <Outlet /> 
      </main>
      </TaskProvider>
    </div>
  );
};

export default Layouts;
