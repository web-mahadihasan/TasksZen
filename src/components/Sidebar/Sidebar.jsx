import {
	AppsOutline,
	GridOutline,
	HomeOutline,
	LogOutOutline,
	NewspaperOutline,
	NotificationsOutline,
	PeopleOutline,
	PieChartOutline,
} from "react-ionicons";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Sidebar = () => {
	const {user, logOutUser} = useAuth()

	const handleLogout = async () => {
		await logOutUser()
		toast.success("Successfully Logout")
	}
	const navLinks = [
		{
			title: "Home",
			icon: (
				<HomeOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Boards",
			icon: (
				<AppsOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: true,
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
			active: false,
		},
		{
			title: "Analytics",
			icon: (
				<PieChartOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Workflows",
			icon: (
				<PeopleOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Notifications",
			icon: (
				<NotificationsOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Newsletter",
			icon: (
				<NewspaperOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
	];
	return (
		<div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
			<div className="w-full flex items-center md:justify-start justify-center md:pl-5 gap-2 h-[70px] bg-[#fff]">
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
			<div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative">
				{navLinks.map((link) => {
					return (
						<div
							key={link.title}
							className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${
								link.active ? "bg-orange-300" : "bg-transparent"
							}`}
						>
							{link.icon}
							<span className="font-medium text-[15px] md:block hidden">{link.title}</span>
						</div>
					);
				})}
				<div onClick={handleLogout} className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200">
					<LogOutOutline />
					<span className="font-medium text-[15px] md:block hidden">Log Out</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;