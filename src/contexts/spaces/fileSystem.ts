import { FileSystem } from "../types";

export type ActionFileSystem =
	| { type: "SET_FILE_LIST"; payload: string[][] }
	| { type: "SELECT_FILE"; payload: number | undefined };

const SET_FILE_LIST = (store: FileSystem, payload: string[][]) => {
	store.fileList = payload;
};
const SELECT_FILE = (store: FileSystem, payload: number | undefined) => {
	store.selectTargetFile = payload;
};
export { SET_FILE_LIST, SELECT_FILE };

// case "SET_FILE_LIST":
// 		selectSpace(newState, "fileSystem");
// 		newState.fileSystem.fileList = action.payload;
// 		break;
// 	case "SELECT_FILE":
// 		newState.fileSystem.selectTargetFile = action.payload;
// 		break;
