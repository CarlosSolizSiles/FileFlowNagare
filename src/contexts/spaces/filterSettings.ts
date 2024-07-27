import {
	FilterSettings,
	TypeItem,
	TypeRequiredField,
	UserProfiles,
} from "../types";

export type ActionFilterSettings =
	| { type: "SELECT_FILTER"; payload: number }
	| { type: "EDIT_DIRECTORY"; payload: string }
	| { type: "SELECT_REQUIRED_FIELD"; payload: TypeRequiredField }
	| { type: "ADD_FILTER_ITEM"; payload: { type: TypeItem; value: string } }
	| { type: "REMOVE_FILTER_ITEM"; payload: { type: TypeItem; index: number } }
	| {
			type: "EDIT_FILTER_ITEM";
			payload: { type: TypeItem; index: number; value: string };
	  }
	| { type: "SET_CURRENT_PROFILE"; payload: number };

const SELECT_FILTER = (state: FilterSettings, payload: number) => {
	state.currentFilter = payload;
};
const EDIT_DIRECTORY = (state: FilterSettings, payload: string) => {
	let EDIT_DIRECTORY = state.profile?.filters.at(state.currentFilter);
	if (EDIT_DIRECTORY) {
		EDIT_DIRECTORY.directoryPath = payload;
	}
};
const SELECT_REQUIRED_FIELD = (
	state: FilterSettings,
	payload: TypeRequiredField,
) => {
	let SELECT_REQUIRED_FIELD = state.profile?.filters.at(state.currentFilter);
	if (SELECT_REQUIRED_FIELD) {
		SELECT_REQUIRED_FIELD.requiredField = payload;
	}
};
const ADD_FILTER_ITEM = (
	state: FilterSettings,
	payload: { type: TypeItem; value: string },
) => {
	let ADD_FILTER_ITEM = state.profile?.filters.at(state.currentFilter);
	if (ADD_FILTER_ITEM) {
		ADD_FILTER_ITEM[payload.type].push(payload.value);
	}
};
const REMOVE_FILTER_ITEM = (
	state: FilterSettings,
	payload: { type: TypeItem; index: number },
) => {
	let REMOVE_FILTER_ITEM = state.profile?.filters.at(state.currentFilter);
	if (REMOVE_FILTER_ITEM) {
		REMOVE_FILTER_ITEM[payload.type].splice(payload.index, 1);
	}
};
const EDIT_FILTER_ITEM = (
	state: FilterSettings,
	payload: { type: TypeItem; index: number; value: string },
) => {
	let EDIT_FILTER_ITEM = state.profile?.filters.at(state.currentFilter);
	if (EDIT_FILTER_ITEM) {
		EDIT_FILTER_ITEM[payload.type][payload.index] = payload.value;
	}
};

const SET_CURRENT_PROFILE = (
	state: FilterSettings,
	payload: number,
	other: UserProfiles,
) => {
	state.profile = structuredClone(other.profileList?.at(payload));
	state.currentProfile = payload;
	state.currentFilter = 0;
};

export {
	SELECT_FILTER,
	EDIT_DIRECTORY,
	SELECT_REQUIRED_FIELD,
	ADD_FILTER_ITEM,
	REMOVE_FILTER_ITEM,
	EDIT_FILTER_ITEM,
	SET_CURRENT_PROFILE,
};
