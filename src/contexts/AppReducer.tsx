import { AppStore } from "./types";

type AppAction =
	| { type: "NAVIGATE"; payload: number }
	| { type: "ADD_FILE" }
	| { type: "REMOVE_FILE" }
	| { type: "SET_FILE_LIST"; payload: string[][] }
	| { type: "UPDATE_SETTINGS"; payload: {} }
	| { type: "LOG_ACTIVITY"; payload: never[] }
	| { type: "UPDATE_NAVIGATION_PATH"; payload: string }
	| { type: "NAVIGATE_BACK"; payload: number }
	| { type: "CHANGE_PROFILE"; payload: number };

// Reducer
const appReducer = (state: AppStore, action: AppAction): AppStore => {
	switch (action.type) {
		case "NAVIGATE":
			return { ...state, currentRoute: action.payload };
		// case "ADD_FILE":
		// 	return {
		// 		...state,
		// 		// fileList: [...state.fileList, action.payload],
		// 	};
		// case "REMOVE_FILE":
		// 	return {
		// 		...state,
		// 		// fileList: state.fileList.filter((file) => file.name !== action.payload),
		// 	};
		case "SET_FILE_LIST":
			return { ...state, fileList: action.payload };
		case "UPDATE_SETTINGS":
			return {
				...state,
				appSettings: { ...state.appSettings, ...action.payload },
			};
		case "LOG_ACTIVITY":
			return { ...state, activityLog: [...state.activityLog, action.payload] };
		case "UPDATE_NAVIGATION_PATH":
			return {
				...state,
				navigationPath: {
					path: state.navigationPath.path + "\\" + action.payload,
					level: state.navigationPath.level - 1,
				},
			};
		case "NAVIGATE_BACK":
			return {
				...state,
				navigationPath: {
					path: state.navigationPath.path
						.split("\\")
						.slice(0, -action.payload)
						.join("\\"),
					level: state.navigationPath.level + action.payload,
				},
			};
		case "CHANGE_PROFILE":
			return {
				...state,
				profiles: {
					selectedProfile: action.payload,
					profileList: state.profiles.profileList,
				},
			};

		default:
			return state;
	}
};

export default appReducer;
