import { AppStore } from "./types";

type AppAction =
	| { type: "NAVIGATE"; payload: number }
	| { type: "SET_FILE_LIST"; payload: string[][] }
	| { type: "UPDATE_NAVIGATION_PATH"; payload: string }
	| { type: "NAVIGATE_BACK"; payload: number }
	| { type: "CHANGE_PROFILE"; payload: number }
	| { type: "SET_PROFILE"; payload: number }
	| { type: "CHANGE_FILTER"; payload: number };

// Reducer
const appReducer = (state: AppStore, action: AppAction): AppStore => {
	switch (action.type) {
		case "NAVIGATE":
			return { ...state, router: { current: action.payload } };
		case "SET_FILE_LIST":
			return {
				...state,
				fileSystem: {
					fileList: action.payload,
				},
			};
		case "UPDATE_NAVIGATION_PATH":
			return {
				...state,
				navigation: {
					path: state.navigation.path + "\\" + action.payload,
					level: state.navigation.level - 1,
				},
			};
		case "NAVIGATE_BACK":
			return {
				...state,
				navigation: {
					path: state.navigation.path
						.split("\\")
						.slice(0, -action.payload)
						.join("\\"),
					level: state.navigation.level + action.payload,
				},
			};
		case "CHANGE_PROFILE":
			return {
				...state,
				userProfiles: {
					selectedProfile: action.payload,
					profileList: state.userProfiles.profileList,
				},
			};
		case "SET_PROFILE":
			return {
				...state,
				filterSettings: {
					profile: state.userProfiles.profileList?.at(action.payload),
					currentProfile: action.payload,
					currentFilter: 0,
				},
			};
		case "CHANGE_FILTER":
			return {
				...state,
				filterSettings: {
					...state.filterSettings,
					currentFilter: action.payload,
				},
			};

		default:
			return state;
	}
};

export default appReducer;
