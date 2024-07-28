import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import {
	switchProfile,
	add,
	remove,
	edit,
} from "@/features/profile/managerProfile";

const useProfile = () => {
	const state = useSelector((state: RootState) => state.profile);
	const dispatch = useDispatch();

	return {
		switchProfile: (index: number) => dispatch(switchProfile(index)),
		add: (name: string) => dispatch(add(name)),
		remove: (index: number) => dispatch(remove(index)),
		edit: (index: number, name: string) => dispatch(edit({ index, name })),
		...state,
		isEmptylist: state.profileList.length === 0,
	};
};

export default useProfile;
