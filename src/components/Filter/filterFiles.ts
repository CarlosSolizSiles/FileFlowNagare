import { FilterCriteria } from "@/features/profile/managerProfile";

const filterFiles = (fileList: string[], filterCriteria?: FilterCriteria) => {
	return new Promise<{ matchedFiles: string[]; unmatchedFiles: string[] }>(
		(resolve, reject) => {
			if (!filterCriteria) {
				reject();
				return;
			}

			const matchedFiles: string[] = [];
			const unmatchedFiles: string[] = [];

			fileList.forEach((file) => {
				const matchesPattern = filterCriteria.regexPatterns.some((pattern) =>
					new RegExp(pattern).test(file),
				);

				const isWhitelist = filterCriteria.listType === "whitelist";
				const isMatch = isWhitelist ? matchesPattern : !matchesPattern;

				if (isMatch) {
					matchedFiles.push(file);
				} else {
					unmatchedFiles.push(file);
				}
			});

			resolve({ matchedFiles, unmatchedFiles });
		},
	);
};

export { filterFiles };