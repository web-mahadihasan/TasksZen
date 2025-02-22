import {
	AppsOutline,
	GridOutline,
	LogOutOutline,
	PieChartOutline,
} from "react-ionicons";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { NavLink } from "react-router";

const Sidebar = () => {
	const {user, logOutUser} = useAuth()

	const handleLogout = async () => {
		await logOutUser()
		toast.success("Successfully Logout")
	}
	const navLinks = [
		{
			title: "Boards",
			icon: (
				<AppsOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			to: "/dashboard",
			end: true,
		},
		{
			title: "Profile",
			icon: (
				<GridOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			to: "/dashboard/profile",
		},
		{
			title: "Activity Logs",
			icon: (
				<PieChartOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			to: "/dashboard/activity",
		}
	];
	return (
		<div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
			<div className="w-full flex items-center md:justify-start justify-center md:pl-5 gap-2 h-[70px] bg-[#fff] dark:bg-black">
				<span className=" font-semibold text-2xl block">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" preserveAspectRatio="xMinYMin meet"
					className="w-10 h-10 text-main dark:text-main fill-current">
					<circle cx="128" cy="128" r="114" stroke="currentColor" strokeWidth="20" fill="none"/>
					<path 
						d="M97.637 121.69c27.327-22.326 54.058-45.426 81.98-67.097-14.646 22.505-29.708 44.711-44.354 67.215-12.562.06-25.123.06-37.626-.119zM120.737 134.132c12.621 0 25.183 0 37.745.179-27.505 22.206-54.117 45.484-82.099 67.096 14.646-22.505 29.708-44.77 44.354-67.275z"
						fill="currentColor"
					/>
					</svg>
				</span>
				<span className="text-main dark:text-main text-2xl font-extrabold hidden md:block">
					TasksZen
				</span>
			</div>
			<div className="sidebar w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative dark:bg-black">
				{navLinks.map((link) => {
					return (
						<NavLink to={link.to} end={link.to === "/dashboard"}
							key={link.title}
							className={`flex items-center gap-2 w-full rounded-lg hover:bg-main px-2 py-3 cursor-pointer`}
						>
							{link.icon}
							<span className="font-medium text-[15px] md:block hidden">{link.title}</span>
						</NavLink>
					);
				})}
				<div onClick={handleLogout} className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-main duration-300 group px-2 py-3 cursor-pointer bg-gray-200">
					<LogOutOutline />
					<span className="font-medium text-[15px] md:block hidden dark:text-black group-hover:text-white">Log Out</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;