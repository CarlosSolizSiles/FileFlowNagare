import { FilterSettings, UserProfiles } from "../types";

export type ActionUserProfiles =
	| { type: "SELECT_PROFILE"; payload: number }
	| { type: "SAVE_PROFILE_LIST" };

const SELECT_PROFILE = (state: UserProfiles, payload: number) => {
	state.selectedProfile = payload;
};
const SAVE_PROFILE_LIST = (state: UserProfiles, other: FilterSettings) => {
	if (!state.profileList) return;
	const currentIndex = other.currentProfile;
	const updatedProfile = structuredClone(other.profile);

	if (
		currentIndex !== undefined &&
		state.profileList[currentIndex] &&
		updatedProfile
	) {
		state.profileList[currentIndex] = updatedProfile;
	}
};

export { SELECT_PROFILE, SAVE_PROFILE_LIST };
