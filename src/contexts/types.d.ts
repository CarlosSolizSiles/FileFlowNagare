export type TypeItem = "fileExtensions" | "searchPatterns";
export type TypeRequiredField = "both" | "extensions" | "patterns";

export interface FilterCriteria {
	name: string;
	directoryPath: string;
	fileExtensions: string[];
	// searchPatterns: {
	// 	description: string;
	// 	regexPattern: string;
	// }[];
	searchPatterns: string[];
	requiredField: TypeRequiredField;
}

export interface ProfileList {
	name: string;
	filters: FilterCriteria[];
}

export interface AppStore {
	router: {
		current: number;
	};
	navigation: {
		path: string;
		level: number;
	};
	fileSystem: {
		fileList: string[][];
		selectTargetFile?: number;
	};
	userProfiles: {
		profileList?: ProfileList[];
		selectedProfile: number;
	};
	filterSettings: {
		profile?: ProfileList;
		currentProfile: number;
		currentFilter: number;
	};
}

// let a = [
// 	{
// 		name: "carlos",
// 		filters: [
// 			{
// 				directoryPath: "path/to/Imagenes",
// 				fileExtensions: [".png", ".jpg", ".webp"],
// 				searchPatterns: [
// 					"\\d{4}-\\d{2}-\\d{2}",
// 					"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
// 				],
// 				requiredField: "extensions",
// 			},
// 		],
// 	},
// ];
