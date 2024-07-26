import { AppStore, TypeItem, TypeRequiredField } from "./types";

type Router = { type: "NAVIGATE_TO_PAGE"; payload: number };

type Navigation =
	| { type: "NAVIGATE_BACKWARD"; payload: number }
	| { type: "UPDATE_NAVIGATION_PATH"; payload: string };

type FileSystem =
	| { type: "SET_FILE_LIST"; payload: string[][] }
	| { type: "SELECT_FILE"; payload: number | undefined };

type UserProfiles =
	| { type: "SELECT_PROFILE"; payload: number }
	| { type: "SAVE_PROFILE_LIST" };

type FilterSettings =
	| { type: "SET_CURRENT_PROFILE"; payload: number }
	| { type: "SELECT_FILTER"; payload: number }
	| { type: "EDIT_DIRECTORY"; payload: string }
	| { type: "SELECT_REQUIRED_FIELD"; payload: TypeRequiredField }
	| { type: "ADD_FILTER_ITEM"; payload: { type: TypeItem; value: string } }
	| { type: "REMOVE_FILTER_ITEM"; payload: { type: TypeItem; index: number } }
	| {
			type: "EDIT_FILTER_ITEM";
			payload: { type: TypeItem; index: number; value: string };
	  };

type AppAction =
	| Router
	| Navigation
	| FileSystem
	| UserProfiles
	| FilterSettings;

// Reducer
const appReducer = (state: AppStore, action: AppAction): AppStore => {
	let newState = { ...state };

	switch (action.type) {
		case "NAVIGATE_TO_PAGE":
			newState.router.current = action.payload;
			return newState;
		case "SET_FILE_LIST":
			newState.fileSystem.fileList = action.payload;
			return newState;
		case "SELECT_FILE":
			newState.fileSystem.selectTargetFile = action.payload;
			return newState;
		case "UPDATE_NAVIGATION_PATH":
			newState.navigation.path = state.navigation.path + "\\" + action.payload;
			newState.navigation.level = state.navigation.level - 1;
			return newState;
		case "NAVIGATE_BACKWARD":
			newState.navigation.path = state.navigation.path
				.split("\\")
				.slice(0, -action.payload)
				.join("\\");
			newState.navigation.level = state.navigation.level + action.payload;
			return newState;
		case "SELECT_PROFILE":
			newState.userProfiles.selectedProfile = action.payload;
			return newState;
		case "SAVE_PROFILE_LIST":
			if (!newState.userProfiles.profileList) {
				return newState;
			}
			const currentIndex = state.filterSettings.currentProfile;
			const updatedProfile = structuredClone(newState.filterSettings.profile);

			if (
				currentIndex !== undefined &&
				newState.userProfiles.profileList[currentIndex] &&
				updatedProfile
			) {
				newState.userProfiles.profileList[currentIndex] = updatedProfile;
			}
			return newState;

		case "SET_CURRENT_PROFILE":
			newState.filterSettings.profile = structuredClone(
				state.userProfiles.profileList?.at(action.payload),
			);
			newState.filterSettings.currentProfile = action.payload;
			newState.filterSettings.currentFilter = 0;
			return newState;
		case "SELECT_FILTER":
			newState.filterSettings.currentFilter = action.payload;
			return newState;
		case "REMOVE_FILTER_ITEM":
			let REMOVE_FILTER_ITEM = newState.filterSettings.profile?.filters.at(
				newState.filterSettings.currentFilter,
			);
			if (REMOVE_FILTER_ITEM) {
				REMOVE_FILTER_ITEM[action.payload.type].splice(action.payload.index, 1);
			}
			return newState;
		case "ADD_FILTER_ITEM":
			let ADD_FILTER_ITEM = newState.filterSettings.profile?.filters.at(
				newState.filterSettings.currentFilter,
			);
			if (ADD_FILTER_ITEM) {
				ADD_FILTER_ITEM[action.payload.type].push(action.payload.value);
			}
			return newState;
		case "EDIT_FILTER_ITEM":
			let EDIT_FILTER_ITEM = newState.filterSettings.profile?.filters.at(
				newState.filterSettings.currentFilter,
			);
			if (EDIT_FILTER_ITEM) {
				EDIT_FILTER_ITEM[action.payload.type][action.payload.index] =
					action.payload.value;
			}
			return newState;
		case "EDIT_DIRECTORY":
			let EDIT_DIRECTORY = newState.filterSettings.profile?.filters.at(
				newState.filterSettings.currentFilter,
			);
			if (EDIT_DIRECTORY) {
				EDIT_DIRECTORY.directoryPath = action.payload;
			}
			return newState;
		case "SELECT_REQUIRED_FIELD":
			let SELECT_REQUIRED_FIELD = newState.filterSettings.profile?.filters.at(
				newState.filterSettings.currentFilter,
			);
			if (SELECT_REQUIRED_FIELD) {
				SELECT_REQUIRED_FIELD.requiredField = action.payload;
			}
			return newState;

		default:
			return newState;
	}
};

export default appReducer;
