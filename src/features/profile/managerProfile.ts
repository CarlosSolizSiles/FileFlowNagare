import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterCriteria {
	name: string;
	directory: string;
	listType: "whitelist" | "blacklist";
	regexPatterns: string[];
}

export interface UserProfile {
	name: string;
	filterSettings: FilterCriteria[];
}

export interface ProfileState {
	profileList: string[];
	selectedProfileIndex?: number;
	filterSettings?: FilterCriteria[];
}

const userProfiles: UserProfile[] = [
	{
		name: "Work Area",
		filterSettings: [
			{
				name: "Trabajos Practicos",
				directory: "./Folder",
				listType: "whitelist",
				regexPatterns: [
					"^((TP n° d-{1}).*)+.(pdf|docx)$",
					"^((Trabajo Grupal).*)|.(doc)$",
					"^(Trabajo Escolar)",
					".(html)$",
				],
			},
		],
	},
	{
		name: "School Documents",
		filterSettings: [
			{
				name: "Trabajos Practicos",
				directory: "./Folder 1",
				listType: "blacklist",
				regexPatterns: ["^(.*patron)|(.extension)$"],
			},
		],
	},
];

const initialState: ProfileState = {
	profileList: userProfiles.map(({ name }) => name),
	selectedProfileIndex: 0,
	filterSettings: userProfiles.at(0)?.filterSettings,
};

export const managerProfile = createSlice({
	name: "profile",
	initialState,
	reducers: {
		switchProfile: (state, action: PayloadAction<number>) => {
			state.selectedProfileIndex = action.payload;
			state.filterSettings = userProfiles.at(action.payload)?.filterSettings;
		},
		addProfile: (state, action: PayloadAction<string>) => {
			state.selectedProfileIndex = state.profileList.length;
			userProfiles.push({ name: action.payload, filterSettings: [] });
			state.profileList.push(action.payload);
			state.filterSettings = userProfiles.at(-1)?.filterSettings;
		},
		deleteProfile: (state, action: PayloadAction<number>) => {
			state.profileList.splice(action.payload, 1);
			state.selectedProfileIndex = undefined;
			state.filterSettings = undefined;
		},
		editProfile: (
			state,
			action: PayloadAction<{ index: number; name: string }>,
		) => {
			state.profileList[action.payload.index] = action.payload.name;
		},
	},
});

// Action creators are generated for each case reducer function
export const { switchProfile, addProfile, deleteProfile, editProfile } =
	managerProfile.actions;

export default managerProfile.reducer;
