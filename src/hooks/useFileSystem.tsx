import useAppContext from "./useAppContext";

const useFileSystem = () => {
	const fileSystem = useAppContext("fileSystem");
	return fileSystem;
};

export default useFileSystem;
