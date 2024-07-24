import useAppContext from "./useAppContext";

const useUserProfiles = () => {
	const userProfiles = useAppContext("userProfiles");
	return userProfiles;
};

export default useUserProfiles;
