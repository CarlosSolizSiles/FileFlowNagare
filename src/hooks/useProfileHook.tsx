import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import {
	switchProfile,
	addProfile,
	deleteProfile,
	editProfile,
} from "@/features/profile/managerProfile";

export type ActionsEvent =
	| { type: "switch"; payload: number }
	| { type: "add"; payload: string }
	| { type: "delete"; payload: number }
	| { type: "edit"; payload: { index: number; name: string } };

const useProfileHook = () => {
	const state = useSelector((state: RootState) => state.profile);
	const dispatch = useDispatch();

	return {
		eventProfile: (action: ActionsEvent) => {
			switch (action.type) {
				case "switch":
					dispatch(switchProfile(action.payload));
					break;
				case "add":
					dispatch(addProfile(action.payload));
					break;
				case "delete":
					dispatch(deleteProfile(action.payload));
					break;
				case "edit":
					dispatch(editProfile(action.payload));
					break;
				default:
					break;
			}
		},
		switchProfile: (index: number) => dispatch(switchProfile(index)),
		addProfile: (name: string) => dispatch(addProfile(name)),
		deleteProfile: (index: number) => dispatch(deleteProfile(index)),
		editProfile: (index: number, name: string) =>
			dispatch(editProfile({ index, name })),
		...state,
		isEmptyProfileList: state.profileList.length === 0,
	};
};

export default useProfileHook;
