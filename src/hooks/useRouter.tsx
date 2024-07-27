import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { navigateTo } from "@/features/router/managerRouter";
// import useAppContext from "./useAppContext";

const useRouter = () => {
	// const router = useAppContext("router");
	const current = useSelector((state: RootState) => state.router.current);
	const dispatch = useDispatch();
	return {
		navigateTo: (current: number) => dispatch(navigateTo(current)),
		current: current,
	};
};

export default useRouter;
