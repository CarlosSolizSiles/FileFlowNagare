import { Router } from "../types";

export type ActionRouter = { type: "NAVIGATE_TO_PAGE"; payload: number };

const NAVIGATE_TO_PAGE = (state: Router, payload: number) => {
	state.current = payload;
};

export { NAVIGATE_TO_PAGE };

// import { AppStore, TypeItem, TypeRequiredField } from "./types";

// type Router = { type: "NAVIGATE_TO_PAGE"; payload: number };

// type Navigation =
// 	| { type: "NAVIGATE_BACKWARD"; payload: number }
// 	| { type: "UPDATE_NAVIGATION_PATH"; payload: string };

// type FileSystem =
// 	| { type: "SET_FILE_LIST"; payload: string[][] }
// 	| { type: "SELECT_FILE"; payload: number | undefined };

// type UserProfiles =
// 	| { type: "SELECT_PROFILE"; payload: number }
// 	| { type: "SAVE_PROFILE_LIST"; payload?: any };

// type FilterSettings =
// 	| { type: "SET_CURRENT_PROFILE"; payload: number }
// 	| { type: "SELECT_FILTER"; payload: number }
// 	| { type: "EDIT_DIRECTORY"; payload: string }
// 	| { type: "SELECT_REQUIRED_FIELD"; payload: TypeRequiredField }
// 	| { type: "ADD_FILTER_ITEM"; payload: { type: TypeItem; value: string } }
// 	| { type: "REMOVE_FILTER_ITEM"; payload: { type: TypeItem; index: number } }
// 	| {
// 			type: "EDIT_FILTER_ITEM";
// 			payload: { type: TypeItem; index: number; value: string };
// 	  };

// type AppAction =
// 	| Router
// 	| Navigation
// 	| FileSystem
// 	| UserProfiles
// 	| FilterSettings;

// const actionHandlers: {
// 	[K in AppAction["type"]]: (state: AppStore, payload?: any) => void;
// } = {
// 	NAVIGATE_TO_PAGE: (state: AppStore, payload: number): void => {
// 		state.router.current = payload;
// 	},
// 	NAVIGATE_BACKWARD: (state: AppStore, payload: number): void => {
// 		state.navigation.path = state.navigation.path
// 			.split("\\")
// 			.slice(0, -payload)
// 			.join("\\");
// 		state.navigation.level = state.navigation.level + payload;
// 	},
// 	UPDATE_NAVIGATION_PATH: (state: AppStore, payload: string): void => {
// 		state.navigation.path = state.navigation.path + "\\" + payload;
// 		state.navigation.level = state.navigation.level - 1;
// 	},
// 	SET_FILE_LIST: (state: AppStore, payload: string[][]): void => {
// 		state.fileSystem.fileList = payload;
// 	},
// 	SELECT_FILE: (state: AppStore, payload: number | undefined): void => {
// 		state.fileSystem.selectTargetFile = payload;
// 	},
// 	SELECT_PROFILE: (state: AppStore, payload: number): void => {
// 		state.userProfiles.selectedProfile = payload;
// 	},
// 	SAVE_PROFILE_LIST: (state: AppStore): void => {
// 		if (!state.userProfiles.profileList) {
// 			return;
// 		}
// 		const currentIndex = state.filterSettings.currentProfile;
// 		const updatedProfile = structuredClone(state.filterSettings.profile);

// 		if (
// 			currentIndex !== undefined &&
// 			state.userProfiles.profileList[currentIndex] &&
// 			updatedProfile
// 		) {
// 			state.userProfiles.profileList[currentIndex] = updatedProfile;
// 		}
// 	},
// 	SET_CURRENT_PROFILE: (state: AppStore, payload: number): void => {
// 		state.filterSettings.profile = structuredClone(
// 			state.userProfiles.profileList?.at(payload),
// 		);
// 		state.filterSettings.currentProfile = payload;
// 		state.filterSettings.currentFilter = 0;
// 	},
// 	SELECT_FILTER: (state: AppStore, payload: number): void => {
// 		state.filterSettings.currentFilter = payload;
// 	},
// 	EDIT_DIRECTORY: (state: AppStore, payload: string): void => {
// 		let currentFilter = state.filterSettings.profile?.filters.at(
// 			state.filterSettings.currentFilter,
// 		);
// 		if (currentFilter) {
// 			currentFilter.directoryPath = payload;
// 		}
// 	},
// 	SELECT_REQUIRED_FIELD: (
// 		state: AppStore,
// 		payload: TypeRequiredField,
// 	): void => {
// 		let currentFilter = state.filterSettings.profile?.filters.at(
// 			state.filterSettings.currentFilter,
// 		);
// 		if (currentFilter) {
// 			currentFilter.requiredField = payload;
// 		}
// 	},
// 	ADD_FILTER_ITEM: (
// 		state: AppStore,
// 		payload: { type: TypeItem; value: string },
// 	): void => {
// 		let currentFilter = state.filterSettings.profile?.filters.at(
// 			state.filterSettings.currentFilter,
// 		);
// 		if (currentFilter) {
// 			currentFilter[payload.type].push(payload.value);
// 		}
// 	},
// 	REMOVE_FILTER_ITEM: (
// 		state: AppStore,
// 		payload: { type: TypeItem; index: number },
// 	): void => {
// 		let currentFilter = state.filterSettings.profile?.filters.at(
// 			state.filterSettings.currentFilter,
// 		);
// 		if (currentFilter) {
// 			currentFilter[payload.type].splice(payload.index, 1);
// 		}
// 	},
// 	EDIT_FILTER_ITEM: (
// 		state: AppStore,
// 		payload: { type: TypeItem; index: number; value: string },
// 	): void => {
// 		let currentFilter = state.filterSettings.profile?.filters.at(
// 			state.filterSettings.currentFilter,
// 		);
// 		if (currentFilter) {
// 			currentFilter[payload.type][payload.index] = payload.value;
// 		}
// 	},
// };

// // Reducer
// const appReducer = (state: AppStore, action: AppAction): AppStore => {
// 	const newState = { ...state };
// 	const handler = actionHandlers[action.type];
// 	handler(newState, action.payload);
// 	return { ...newState };
// };

// export default appReducer;
