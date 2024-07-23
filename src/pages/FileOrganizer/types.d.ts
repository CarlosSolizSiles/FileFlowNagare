export interface FilterCriteria {
	directoryPath: string;
	fileExtensions: string[];
	// searchPatterns: {
	// 	description: string;
	// 	regexPattern: string;
	// }[];
	searchPatterns: string[];
	requiredField: "both" | "extensions" | "patterns";
}

export interface Info {
	nameFolder: string;
	matchedFiles: string[];
}

export interface AppStore {
	info: Info[];
	allFiles: string[];
	currentFilterIndex: number;
}
