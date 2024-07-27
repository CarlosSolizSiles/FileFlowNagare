import { Info } from "@/pages/FileOrganizer/types";

interface FolderSummaryProps {
	filterStores?: Info[];
}

const FolderSummary = ({ filterStores }: FolderSummaryProps) => {
	console.log();

	return (
		<div className="mt-2 h-[calc(100%_-_2.5rem)] border-2 border-neutral-700 p-2 text-lg text-white/50 shadow-md">
			{filterStores?.map(({ nameFolder, matchedFiles }) => {
				return (
					<div key={nameFolder}>
						{nameFolder} {matchedFiles.length}
					</div>
				);
			})}
		</div>
	);
};

export default FolderSummary;
