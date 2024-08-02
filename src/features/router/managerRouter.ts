import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RouterState {
	current: number;
}

const initialState: RouterState = {
	current: 1,
};

export const managerRouter = createSlice({
	name: "router",
	initialState,
	reducers: {
		navigateTo: (state, action: PayloadAction<number>) => {
			state.current = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { navigateTo } = managerRouter.actions;

export default managerRouter.reducer;
