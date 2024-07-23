import { FilterCriteria } from "./types";

const filterFiles = (criteria: FilterCriteria, files: string[]) => {
	const unmatchedFiles: string[] = [];
	const matchedFiles: string[] = [];

	files.forEach((file) => {
		const fileExtension = "." + file.split(".").pop();
		const matchesPattern = criteria.searchPatterns.some((regexPattern) =>
			new RegExp(regexPattern).test(file),
		);
		const matchesExtension = criteria.fileExtensions.includes(fileExtension);

		const isMatch =
			(criteria.requiredField === "both" &&
				matchesExtension &&
				matchesPattern) ||
			(criteria.requiredField === "extensions" && matchesExtension) ||
			(criteria.requiredField === "patterns" && matchesPattern);

		isMatch ? matchedFiles.push(file) : unmatchedFiles.push(file);
	});

	return { matchedFiles, unmatchedFiles };
};

export { filterFiles };
