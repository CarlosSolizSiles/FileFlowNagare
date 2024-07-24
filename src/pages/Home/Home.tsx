import { useTransition } from "react";

import { MdRefresh } from "react-icons/md";

import NavigationDirectory from "@components/NavigationDirectory";
import DirectoryList from "@components/DirectoryList";
import useFileSystem from "@/hooks/useFileSystem";

// import useAppContext from "@hooks/useAppContext";

// import useGetDirectory from "../hooks/useGetDirectory";

const Home = () => {
	// const { directory } = useGetDirectory(
	// 	"D:\\User\\Fordread\\OneDrive\\Escritorio\\Escritorio-app\\Galeria\\WhatsApp Stickers",
	// );
	const { refreshDirectoryContents, isTransitionPending } = useFileSystem();
	const [isPendingUpdateDirectory, startTransition] = useTransition();
	return (
		<>
			<div className="flex justify-between p-4">
				<NavigationDirectory />
				<button
					type="button"
					onClick={() => {
						startTransition(refreshDirectoryContents);
					}}
					disabled={isPendingUpdateDirectory}
					className="size-8 items-center rounded-md border-2 border-red-500/50 text-base font-bold text-red-500/50 shadow-lg transition-colors duration-300 ease-out hover:border-red-500/80 hover:text-red-500/80 active:border-red-500 active:text-red-500 disabled:border-red-700/20 disabled:text-red-700/20 [&_svg]:disabled:animate-spin"
				>
					<MdRefresh className="size-full p-0.5" />
				</button>
			</div>
			{isTransitionPending ? (
				<div className="animate-loading text-center text-2xl transition-colors delay-1000 duration-300">
					Loading...
				</div>
			) : (
				<DirectoryList></DirectoryList>
			)}
		</>
	);
};

export default Home;
