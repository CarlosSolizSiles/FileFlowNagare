interface FileListProps {
	fileNames?: string[];
}

const FileList = ({ fileNames }: FileListProps) => {
	return (
		<div className="w-1/3 min-w-80">
			<div className="scrollbar h-full max-h-full overflow-auto border-2 border-r-0 border-neutral-700 p-2 text-lg text-white/50 shadow-md">
				{fileNames?.map((fileName) => (
					<div
						key={fileName}
						className="animation max-w-full overflow-hidden text-ellipsis text-nowrap"
					>
						{fileName}
					</div>
				))}
			</div>
		</div>
	);
};

export default FileList;
