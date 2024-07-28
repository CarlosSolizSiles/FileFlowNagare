import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
	profileList: string[];
	selectedIndex: number | undefined;
}

const initialState: ProfileState = {
	profileList: [...Array(5)].map((_, i) => `Profile ${i}`),
	selectedIndex: undefined,
};

export const managerProfile = createSlice({
	name: "profile",
	initialState,
	reducers: {
		switchProfile: (state, action: PayloadAction<number>) => {
			state.selectedIndex = action.payload;
		},
		add: (state, action: PayloadAction<string>) => {
			state.profileList.push(action.payload);
		},
		remove: (state, action: PayloadAction<number>) => {
			state.profileList.splice(action.payload, 1);
			state.selectedIndex = undefined;
		},
		edit: (state, action: PayloadAction<{ index: number; name: string }>) => {
			state.profileList[action.payload.index] = action.payload.name;
		},
	},
});

// Action creators are generated for each case reducer function
export const { switchProfile, add, remove, edit } = managerProfile.actions;

export default managerProfile.reducer;
