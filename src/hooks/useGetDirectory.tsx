import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

interface StoreDirectory {
	path: string;
	directory: string[][];
}

function getDirectory(path: string): Promise<string[][]> {
	return invoke("get_directory", { path });
}

// function isFolder(path: string): Promise<boolean> {
// 	return invoke("is_folder", { path });
// }

const useGetDirectory = (path_default: string) => {
	const [storeDirectory, setStoreDirectory] = useState<StoreDirectory>({
		path: path_default,
		directory: [],
	});

	const newPath = (path: string) => setStoreDirectory({ path, directory: [] });

	useEffect(() => {
		getDirectory(storeDirectory.path).then((directory) =>
			setStoreDirectory((state) => ({ ...state, directory })),
		);
	}, [storeDirectory.path]);

	return { ...storeDirectory, newPath };
};

export default useGetDirectory;
