import {
	ActionFileSystem,
	SELECT_FILE,
	SET_FILE_LIST,
} from "./spaces/fileSystem";
import {
	ActionFilterSettings,
	ADD_FILTER_ITEM,
	EDIT_DIRECTORY,
	EDIT_FILTER_ITEM,
	REMOVE_FILTER_ITEM,
	SELECT_FILTER,
	SELECT_REQUIRED_FIELD,
	SET_CURRENT_PROFILE,
} from "./spaces/filterSettings";
import {
	ActionNavigation,
	NAVIGATE_BACKWARD,
	UPDATE_NAVIGATION_PATH,
} from "./spaces/navigation";
import { ActionRouter, NAVIGATE_TO_PAGE } from "./spaces/route";
import {
	ActionUserProfiles,
	SAVE_PROFILE_LIST,
	SELECT_PROFILE,
} from "./spaces/userProfiles";
import { AppStore } from "./types";

type AppAction =
	| ActionFileSystem
	| ActionFilterSettings
	| ActionNavigation
	| ActionRouter
	| ActionUserProfiles;

// const selectSpace = <K extends keyof AppStore>(
// 	state: AppStore,
// 	key: K,
// ): AppStore[K] => state[key];

// Reducer
const appReducer = (state: AppStore, action: AppAction): AppStore => {
	let newState = { ...state };

	switch (action.type) {
		// * -------------
		case "SET_FILE_LIST":
			SET_FILE_LIST(newState.fileSystem, action.payload);
			break;
		case "SELECT_FILE":
			SELECT_FILE(newState.fileSystem, action.payload);
			break;
		// * -------------
		case "SELECT_FILTER":
			SELECT_FILTER(newState.filterSettings, action.payload);
			break;
		case "REMOVE_FILTER_ITEM":
			REMOVE_FILTER_ITEM(newState.filterSettings, action.payload);
			break;
		case "ADD_FILTER_ITEM":
			ADD_FILTER_ITEM(newState.filterSettings, action.payload);
			break;
		case "EDIT_FILTER_ITEM":
			EDIT_FILTER_ITEM(newState.filterSettings, action.payload);
			break;
		case "EDIT_DIRECTORY":
			EDIT_DIRECTORY(newState.filterSettings, action.payload);
			break;
		case "SELECT_REQUIRED_FIELD":
			SELECT_REQUIRED_FIELD(newState.filterSettings, action.payload);
			break;
		case "SET_CURRENT_PROFILE":
			SET_CURRENT_PROFILE(
				newState.filterSettings,
				action.payload,
				newState.userProfiles,
			);
			break;
		// * -------------
		case "UPDATE_NAVIGATION_PATH":
			UPDATE_NAVIGATION_PATH(newState.navigation, action.payload);
			break;
		case "NAVIGATE_BACKWARD":
			NAVIGATE_BACKWARD(newState.navigation, action.payload);
			break;
		// * -------------
		case "NAVIGATE_TO_PAGE":
			NAVIGATE_TO_PAGE(newState.router, action.payload);
			break;
		// * -------------
		case "SELECT_PROFILE":
			SELECT_PROFILE(newState.userProfiles, action.payload);
			break;
		case "SAVE_PROFILE_LIST":
			SAVE_PROFILE_LIST(newState.userProfiles, newState.filterSettings);
			break;
		// * -------------
	}

	return newState;
};

export default appReducer;
