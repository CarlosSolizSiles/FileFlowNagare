import { useEffect, useState } from "react";
import useUserProfiles from "@/hooks/useUserProfiles";
import { AppStore } from "./types";
// import filtersData from "../../assets/filters.json";
import { filterFiles } from "./filterFiles";
import useFileSystem from "@/hooks/useFileSystem";

// const filterCriteriaList = filtersData as FilterCriteria[];

const useFileFilteringHooks = () => {
	const { profileList, selectedProfile } = useUserProfiles();
	const { fileList } = useFileSystem();
	const [{ info, allFiles, currentFilterIndex }, setState] = useState<AppStore>(
		{
			info: profileList?.at(selectedProfile).filters.map((criteria) => ({
				nameFolder: criteria.directoryPath.split("/").pop()!,
				matchedFiles: [],
			})),
			allFiles: fileList[1],
			currentFilterIndex: 0,
		},
	);

	useEffect(() => {
		setState({
			info: profileList?.at(selectedProfile)?.filters.map((criteria) => ({
				nameFolder: criteria.directoryPath.split("/").pop()!,
				matchedFiles: [],
			})),
			allFiles: fileList[1],
			currentFilterIndex: 0,
		});
	}, [selectedProfile]);

	useEffect(() => {
		setState((prevState) => ({ ...prevState, allFiles: fileList[1] }));
	}, [fileList[1]]);

	useEffect(() => {
		if (!currentFilterIndex || currentFilterIndex > info.length) return;

		const timeoutId = setTimeout(applyFileFilter, 1000);

		return () => clearTimeout(timeoutId);
	}, [allFiles]);

	const applyFileFilter = () => {
		const currentFilter = info[currentFilterIndex];
		if (!currentFilter) return;

		const { matchedFiles, unmatchedFiles } = filterFiles(
			profileList[selectedProfile].filters[currentFilterIndex],
			allFiles,
		);
		currentFilter.matchedFiles = matchedFiles;

		setState((prevState) => ({
			...prevState,
			allFiles: unmatchedFiles,
			currentFilterIndex: prevState.currentFilterIndex + 1,
		}));
	};
	return { allFiles, info, applyFileFilter };
};

export default useFileFilteringHooks;
