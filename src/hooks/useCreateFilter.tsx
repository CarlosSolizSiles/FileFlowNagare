import { FilterCriteria } from "@/features/profile/managerProfile";
import { useState } from "react";

export type ActionsEvent =
	| { type: "switch"; payload: number }
	| { type: "add"; payload: string }
	| { type: "delete"; payload: number }
	| { type: "edit"; payload: { index: number; name: string } };

export type StoreFilter = {
	filterList: string[];
	selectedFilterIndex?: number | undefined;
};

const useCreateFilter = (init_list?: FilterCriteria[]) => {
	const [storeFilter, setStoreFilter] = useState<StoreFilter>({
		filterList: init_list?.map(({ name }) => name) ?? [],
		selectedFilterIndex: undefined,
	});

	const switchProfile = (index: number) => {
		setStoreFilter((prevState) => {
			return { ...prevState, selectedFilterIndex: index };
		});
	};
	const addProfile = (name: string) => {
		setStoreFilter((prevState) => {
			return {
				filterList: [...prevState.filterList, name],
				selectedFilterIndex: prevState.filterList.length,
			};
		});
	};
	const deleteProfile = (index: number) => {
		setStoreFilter((prevState) => {
			const newState = { ...prevState, selectedFilterIndex: undefined };
			newState.filterList.splice(index, 1);
			return newState;
		});
	};
	const editProfile = (date: { index: number; name: string }) => {
		setStoreFilter((prevState) => {
			const newState = { ...prevState };
			newState.filterList[date.index] = date.name;
			return newState;
		});
	};
	const resetFilter = () => {
		setStoreFilter({
			filterList: init_list?.map(({ name }) => name) ?? [],
			selectedFilterIndex: undefined,
		});
	};

	return {
		eventFilter: (action: ActionsEvent) => {
			switch (action.type) {
				case "switch":
					switchProfile(action.payload);
					break;
				case "add":
					addProfile(action.payload);
					break;
				case "delete":
					deleteProfile(action.payload);
					break;
				case "edit":
					editProfile(action.payload);
					break;
				default:
					break;
			}
		},
		resetFilter,
		...storeFilter,
	};
};

export default useCreateFilter;

// import type { RootState } from "@/app/store";
// import { useSelector, useDispatch } from "react-redux";
// import {
// 	switchProfile,
// 	addProfile,
// 	deleteProfile,
// 	editProfile,
// } from "@/features/profile/managerProfile";

// const useProfileHook = () => {
// 	const state = useSelector((state: RootState) => state.profile);
// 	const dispatch = use;

// 	return {
// 		eventProfile: (action: ActionsEvent) => {
// 			switch (action.type) {
// 				case "switch":
// 					switchProfile(action.payload);
// 					break;
// 				case "add":
// 					addProfile(action.payload);
// 					break;
// 				case "delete":
// 					deleteProfile(action.payload);
// 					break;
// 				case "edit":
// 					editProfile(action.payload);
// 					break;
// 				default:
// 					break;
// 			}
// 		},
// 		...state,
// 	};
// };

// export default useProfileHook;
