import { useEffect, useReducer, useTransition } from "react";
import { AppStore, ProfileList } from "./types";
import { invoke } from "@tauri-apps/api/core";
import profileData from "@assets/profile.json";
import appReducer from "./AppReducer";

// Function to fetch the directory
const fetchDirectory = (path: string): Promise<string[][]> =>
	invoke<string[][]>("fetch_directory", { path });

// Initial state
const initialState: AppStore = {
	currentRoute: 1,
	navigationPath: {
		path: "D:\\User\\Fordread\\Downloads",
		level: -1,
	},
	profiles: { profileList: profileData as ProfileList[], selectedProfile: 1 },
	fileList: [],
	appSettings: {},
	activityLog: [],
};

const useAppReducer = () => {
	const [state, dispatch] = useReducer(appReducer, initialState);
	const [isPending, startTransition] = useTransition();

	// Navigation functions
	const navigateToRoute = (route: number) =>
		dispatch({ type: "NAVIGATE", payload: route });

	const updateDirectory = async () => {
		const directory = await fetchDirectory(state.navigationPath.path);
		dispatch({ type: "SET_FILE_LIST", payload: directory });
	};
	const updateDirectoryWithTransition = () => {
		if (!state.navigationPath.path) return;
		startTransition(updateDirectory);
	};

	// Navigation path functions
	const updateNavigationPath = (folder: string) =>
		dispatch({ type: "UPDATE_NAVIGATION_PATH", payload: folder });
	const navigateBack = (levels: number) =>
		dispatch({ type: "NAVIGATE_BACK", payload: levels });

	const changeProfile = (selectedProfile: number) => {
		dispatch({ type: "CHANGE_PROFILE", payload: selectedProfile });
	};

	// File handling functions
	// const addFile = (file: string) =>
	// 	dispatch({ type: "ADD_FILE", payload: file });
	// const removeFile = (fileName: string) =>
	// 	dispatch({ type: "REMOVE_FILE", payload: fileName });
	// Settings functions
	// const updateSettings = (newSettings: object) =>
	// 	dispatch({ type: "UPDATE_SETTINGS", payload: newSettings });

	// Activity log functions
	// const logActivity = (activity: string) =>
	// 	dispatch({ type: "LOG_ACTIVITY", payload: activity });

	useEffect(() => {
		const id = setTimeout(() => {
			updateDirectoryWithTransition();
		}, 0);
		return () => {
			clearTimeout(id);
		};
	}, [state.navigationPath]);

	return {
		...state,
		isPending,
		navigateToRoute,
		updateDirectory,
		updateNavigationPath,
		navigateBack,
		changeProfile,
		// addFile,
		// removeFile,
		// updateSettings,
		// logActivity,
	};
};

export type UseAppReducer = ReturnType<typeof useAppReducer>;

export default useAppReducer;
