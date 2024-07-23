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
	};
	userProfiles: {
		profileList: ProfileList[];
		selectedProfile: number;
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
