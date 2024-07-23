import { useRef } from "react";

import useFileFilteringHooks from "./useFileFilteringHooks";

import FileList from "@components/FileOrganizer/FileList";
import FilterSettingsModal from "@components/FileOrganizer/FilterSettingsModal";
import FilterControls from "@components/FileOrganizer/FilterControls";
import FolderSummary from "@components/FileOrganizer/FolderSummary";

const FileOrganizer = () => {
	const { info, allFiles, applyFileFilter } = useFileFilteringHooks();
	const modal = useRef<HTMLDialogElement>(null);

	return (
		<div className="relative flex h-full gap-2 p-4">
			<FilterSettingsModal ref={modal} />
			<div className="flex-1">
				<FilterControls
					applyFileFilter={applyFileFilter}
					toggleSettingsModal={() => {
						modal.current?.showModal();
					}}
				/>
				<FolderSummary filterStores={info} />
			</div>
			<FileList fileNames={allFiles} />
		</div>
	);
};

export default FileOrganizer;
