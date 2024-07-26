import { useEffect, useReducer, useTransition } from "react";
import { AppStore, ProfileList, TypeItem, TypeRequiredField } from "./types";
import { invoke } from "@tauri-apps/api/core";
import profileData from "@assets/profile.json";
import appReducer from "./AppReducer";

// Function to fetch the directory
const fetchDirectory = (path: string): Promise<string[][]> =>
	invoke<string[][]>("fetch_directory", { path });

if (!localStorage.profileData) {
	localStorage.profileData = JSON.stringify(profileData);
}

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
		profileList: JSON.parse(localStorage.profileData) as ProfileList[],
		selectedProfile: 0,
	},
	fileSystem: {
		fileList: [],
	},
	filterSettings: {
		profile: structuredClone(profileData.at(0) as ProfileList),
		currentProfile: 0,
		currentFilter: 0,
	},
};

const useAppReducer = () => {
	const [state, dispatch] = useReducer(appReducer, initialState);
	const [isTransitionPending, startTransition] = useTransition();

	// ! ROUTER
	const navigateToRoute = (route: number) =>
		dispatch({ type: "NAVIGATE_TO_PAGE", payload: route });

	// ! FILE SYSTEM
	const refreshDirectoryContents = async () => {
		const directory = await fetchDirectory(state.navigation.path);
		dispatch({ type: "SET_FILE_LIST", payload: directory });
	};
	const refreshDirectoryContentsWithTransition = () => {
		if (!state.navigation.path) return;
		startTransition(refreshDirectoryContents);
	};
	const selectFile = (file?: number) => {
		dispatch({ type: "SELECT_FILE", payload: file });
	};

	// ! USER PROFILE
	const switchProfile = (selectedProfile: number) => {
		dispatch({ type: "SELECT_PROFILE", payload: selectedProfile });
	};
	const saveProfileList = () => {
		dispatch({ type: "SAVE_PROFILE_LIST" });
	};

	// ! NAVIGATION DIRECTORY
	const updateNavigationPath = (folder: string) =>
		dispatch({ type: "UPDATE_NAVIGATION_PATH", payload: folder });
	const navigateBackByLevels = (levels: number) =>
		dispatch({ type: "NAVIGATE_BACKWARD", payload: levels });

	// ! FILTER SETTINGS
	const setProfile = (index: number) => {
		dispatch({ type: "SET_CURRENT_PROFILE", payload: index });
	};
	const changeFilter = (index: number) => {
		dispatch({ type: "SELECT_FILTER", payload: index });
	};
	const addItem = (type: TypeItem, value: string) => {
		dispatch({ type: "ADD_FILTER_ITEM", payload: { type, value } });
	};
	const deleteItem = (type: TypeItem, index: number) => {
		dispatch({ type: "REMOVE_FILTER_ITEM", payload: { type, index } });
	};
	const editItem = (type: TypeItem, index: number, value: string) => {
		dispatch({ type: "EDIT_FILTER_ITEM", payload: { type, index, value } });
	};
	const editDirectory = (value: string) => {
		dispatch({ type: "EDIT_DIRECTORY", payload: value });
	};
	const selectRequiredField = (type: TypeRequiredField) => {
		dispatch({ type: "SELECT_REQUIRED_FIELD", payload: type });
	};
	useEffect(() => {
		const id = setTimeout(refreshDirectoryContentsWithTransition, 0);
		return () => {
			clearTimeout(id);
		};
	}, [state.navigation.path]);

	return {
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
			selectFile,
		},
		userProfiles: {
			...state.userProfiles,
			switchProfile,
			saveProfileList,
		},
		filterSettings: {
			...state.filterSettings,
			setProfile,
			changeFilter,
			addItem,
			deleteItem,
			editItem,
			editDirectory,
			selectRequiredField,
		},
	};
};

export type UseAppReducer = ReturnType<typeof useAppReducer>;

export default useAppReducer;
