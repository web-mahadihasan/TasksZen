import * as React from "react"
import {
	ChevronDown,
	PersonCircle,
	SearchOutline,
	ShareSocialOutline,
} from "react-ionicons";
import useAuth from "../../hooks/useAuth";
import { Moon, Sun, } from "lucide-react"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"
import { useTaskContext } from "../../contexts/TaskContext";
import { Link } from "react-router";

const Navbar = () => {
	const {user} = useAuth()
	const [isDarkMode, setIsDarkMode] = React.useState(false)
	const {search, setSearch} = useTaskContext()
	
	React.useEffect(() => {
	  if (isDarkMode) {
		document.documentElement.classList.add("dark")
	  } else {
		document.documentElement.classList.remove("dark")
	  }
	}, [isDarkMode])

	return (
		<div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff] dark:bg-black">
			<div className="flex items-center gap-3 cursor-pointer">
				<PersonCircle
					color="#fb923c"
					width={"28px"}
					height={"28px"}
				/>
				<span className="text-main font-semibold md:text-lg text-sm whitespace-nowrap">
					{user?.displayName}
				</span>
				<ChevronDown
					color="#22b573"
					width={"16px"}
					height={"16px"}
				/>
			</div>
			<div className="md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-3 py-[10px] flex items-center gap-2">
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
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
					<ShareSocialOutline color={"#444"} />
				</div>
				
				<div className="grid place-items-center bg-gray-100 rounded-full cursor-pointer">
					<Link to={"/dashboard/profile"}><img src={user?.photoURL} alt="" className="w-10 h-10 rounded-full ring-2 ring-offset-1 ring-main" /></Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;