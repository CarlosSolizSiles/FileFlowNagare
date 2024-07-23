import { use } from "react";
import AppContext from "@/contexts/AppContext";

const useNavigation = () => {
	const { navigation } = use(AppContext);
	return navigation;
};

export default useNavigation;
