import * as React from "react"
import {
	ChevronDown,
	PersonCircle,
	SearchOutline,
	ShareSocialOutline,
} from "react-ionicons";
import useAuth from "../../hooks/useAuth";
import { MenuIcon, Moon, Sun, } from "lucide-react"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"
import { useTaskContext } from "../../contexts/TaskContext";
import { Link } from "react-router";

const Navbar = () => {
	const {user, setOpenSidebar, openSidebar} = useAuth()
	const [isDarkMode, setIsDarkMode] = React.useState(false)
	const {search, setSearch} = useTaskContext()

	React.useEffect(() => {
	  if (isDarkMode) {
		document.documentElement.classList.add("dark")
	  } else {
		document.documentElement.classList.remove("dark")
	  }
	}, [isDarkMode])
	// md:left-[230px] left-[60px]
	return (
		<div className="w-full z-40  xl:w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0  border-b border-slate-300 bg-[#fff] dark:bg-black">
			<div className="">
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
				<span className="text-main dark:text-main text-2xl font-extrabold hidden lg:block">
					TasksZen
				</span>
			</div>
			</div>
			<div className="flex items-center gap-3 cursor-pointer">
				<PersonCircle
					color="#fb923c"
					width={"28px"}
					height={"28px"}
				/>
				<span className="text-main font-semibold md:text-lg text-sm whitespace-nowrap hidden lg:block">
					{user?.displayName}
				</span>
				<ChevronDown
					color="#22b573"
					width={"16px"}
					height={"16px"}
				/>
			</div>
			<div className="md:w-[300px] lg:w-[800px] w-[150px] bg-gray-100 rounded-lg px-3 py-[10px] flex items-center gap-2">
				<SearchOutline color={"#999"} />
				<input
					type="text" onChange={(e) => setSearch(e.target.value)}
					placeholder="Search" value={search}
					className="w-full bg-gray-100 outline-none text-[15px]"
				/>
			</div>
			<div className="md:flex hidden items-center gap-4">
				<div className="flex items-center space-x-2">
					<Sun className="h-4 w-4" />
					<Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
					<Moon className="h-4 w-4" />
					<Label htmlFor="dark-mode" className="sr-only">
						Toggle dark mode
					</Label>
				</div>
				<div className="xl:grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer hidden">
					<ShareSocialOutline color={"#444"} />
				</div>
				
				<div className="grid place-items-center bg-gray-100 rounded-full cursor-pointer w-10 h-10">
					<Link to={"/dashboard/profile"}><img src={user?.photoURL} alt="" className="w-10 h-10 rounded-full ring-2 ring-offset-1 ring-main hidden md:block" /></Link>
				</div>
			</div>
			<div className="lg:hidden">
				<button onClick={() => setOpenSidebar(!openSidebar)}>
					<MenuIcon size={26}/>
				</button>
			</div>
		</div>
	);
};

export default Navbar;