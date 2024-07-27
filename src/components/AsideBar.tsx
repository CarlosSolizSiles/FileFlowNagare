import {
	HiOutlineHome,
	HiOutlineFolder,
	HiOutlineArchive,
	HiOutlineCog,
} from "react-icons/hi";
import useRouter from "@/hooks/useRouter";

const optionsMenu = [
	{ length: 126, text: "Inicio", Icon: HiOutlineHome },
	{ length: 126, text: "Organizar", Icon: HiOutlineFolder },
	{ length: 126, text: "Historial", Icon: HiOutlineArchive },
	{ length: 126, text: "Configuración", Icon: HiOutlineCog },
];

const AsideBar = () => {
	const { current, navigateTo } = useRouter();
	return (
		<nav>
			<ul className="flex">
				{optionsMenu.map(({ Icon, text, length }, len) => (
					<li key={text}>
						<button
							type="button"
							className={`${current === len ? "cursor-default text-amber-400" : "hover:text-amber-400/70"} flex h-12 items-center`}
							onClick={() => current !== len && navigateTo(len)}
						>
							<Icon className="size-12 p-2 transition-all duration-300 ease-in" />
							<div
								className="h-full cursor-default content-center overflow-hidden text-ellipsis whitespace-nowrap text-left text-lg font-semibold transition-all duration-300 ease-in"
								style={{ width: current === len ? length : 0 }}
							>
								<span className="ml-2">{text}</span>
							</div>
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default AsideBar;
