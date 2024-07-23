import { use } from "react";
import AppContext from "@/contexts/AppContext";

const useAppContext = () => {
	const state = use(AppContext);
	return state;
};

export default useAppContext;
