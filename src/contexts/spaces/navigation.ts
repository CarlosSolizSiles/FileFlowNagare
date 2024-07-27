import { Navigation } from "../types";

export type ActionNavigation =
	| { type: "NAVIGATE_BACKWARD"; payload: number }
	| { type: "UPDATE_NAVIGATION_PATH"; payload: string };

const NAVIGATE_BACKWARD = (state: Navigation, payload: number) => {
	state.path = state.path.split("\\").slice(0, -payload).join("\\");
	state.level = state.level + payload;
};
const UPDATE_NAVIGATION_PATH = (state: Navigation, payload: string) => {
	state.path = state.path + "\\" + payload;
	state.level = state.level - 1;
};

export { NAVIGATE_BACKWARD, UPDATE_NAVIGATION_PATH };
