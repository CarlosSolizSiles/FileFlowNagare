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

interface Router {
	current: number;
}
interface Navigation {
	path: string;
	level: number;
}
interface FileSystem {
	fileList: string[][];
	selectTargetFile?: number;
}
interface UserProfiles {
	profileList?: ProfileList[];
	selectedProfile: number;
}
interface FilterSettings {
	profile?: ProfileList;
	currentProfile: number;
	currentFilter: number;
}

export interface AppStore {
	router: Router;
	navigation: Navigation;
	fileSystem: FileSystem;
	userProfiles: UserProfiles;
	filterSettings: FilterSettings;
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
