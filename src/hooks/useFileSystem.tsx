import { use } from "react";
import AppContext from "@/contexts/AppContext";

const useFileSystem = () => {
	const { fileSystem } = use(AppContext);
	return fileSystem;
};

export default useFileSystem;
