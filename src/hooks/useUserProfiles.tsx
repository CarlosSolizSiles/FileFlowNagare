import { use } from "react";
import AppContext from "@/contexts/AppContext";

const useUserProfiles = () => {
	const { userProfiles } = use(AppContext);
	return userProfiles;
};

export default useUserProfiles;
