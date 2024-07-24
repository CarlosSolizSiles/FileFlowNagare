import useAppContext from "./useAppContext";

const useNavigation = () => {
	const navigation = useAppContext("navigation");
	return navigation;
};

export default useNavigation;
