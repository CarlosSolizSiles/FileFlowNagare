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
	router: {
		current: 1,
	},
	navigation: {
		path: "D:\\User\\Fordread\\Downloads",
		level: -1,
	},
	userProfiles: {
		profileList: profileData as ProfileList[],
		selectedProfile: 1,
	},
	fileSystem: {
		fileList: [],
	},
};

const useAppReducer = () => {
	const [state, dispatch] = useReducer(appReducer, initialState);
	const [isTransitionPending, startTransition] = useTransition();

	// ! ROUTER
	const navigateToRoute = (route: number) =>
		dispatch({ type: "NAVIGATE", payload: route });

	// ! FILE SYSTEM
	const refreshDirectoryContents = async () => {
		const directory = await fetchDirectory(state.navigation.path);
		dispatch({ type: "SET_FILE_LIST", payload: directory });
	};
	const refreshDirectoryContentsWithTransition = () => {
		if (!state.navigation.path) return;
		startTransition(refreshDirectoryContents);
	};

	// ! NAVIGATION DIRECTORY
	const updateNavigationPath = (folder: string) =>
		dispatch({ type: "UPDATE_NAVIGATION_PATH", payload: folder });
	const navigateBackByLevels = (levels: number) =>
		dispatch({ type: "NAVIGATE_BACK", payload: levels });

	// ! USER_PROFILE
	const switchProfile = (selectedProfile: number) => {
		dispatch({ type: "CHANGE_PROFILE", payload: selectedProfile });
	};

	useEffect(() => {
		const id = setTimeout(() => {
			refreshDirectoryContentsWithTransition();
		}, 0);
		return () => {
			clearTimeout(id);
		};
	}, [state.navigation]);

	return {
		// ...state,
		router: {
			...state.router,
			navigateToRoute,
		},
		navigation: {
			...state.navigation,
			updateNavigationPath,
			navigateBackByLevels,
		},
		fileSystem: {
			...state.fileSystem,
			refreshDirectoryContents,
			isTransitionPending,
		},
		userProfiles: {
			switchProfile,
			...state.userProfiles,
		}, // userProfiles

		// addFile,
		// removeFile,
		// updateSettings,
		// logActivity,
	};
};

export type UseAppReducer = ReturnType<typeof useAppReducer>;

export default useAppReducer;
