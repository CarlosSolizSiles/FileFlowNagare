import useAppContext from "./useAppContext";

const useFilterSettings = () => {
	const filterSettings = useAppContext("filterSettings");
	return filterSettings;
};

export default useFilterSettings;
