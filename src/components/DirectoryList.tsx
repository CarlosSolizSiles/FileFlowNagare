import React, { useState } from "react";
import useAppContext from "@hooks/useAppContext";
import { AiFillFile, AiFillFolder } from "react-icons/ai";

const DirectoryItem = ({
	name,
	isFolder,
}: {
	name: string;
	isFolder: boolean;
}) => {
	const { updateNavigationPath } = useAppContext();
	return (
		<li
			className="h-8 w-full overflow-hidden text-ellipsis text-nowrap rounded-md bg-neutral-700 pr-2 shadow-lg"
			title={name}
			onClick={() => {
				if (isFolder) {
					updateNavigationPath(name);
				}
			}}
		>
			{isFolder ? (
				<AiFillFolder className="inline-block aspect-square size-8 p-2" />
			) : (
				<AiFillFile className="inline-block aspect-square size-8 p-2" />
			)}
			{name}
		</li>
	);
};

const renderDirectoryItems = (files: string[][], maxShowItems: number) => {
	if (files.length === 0) return [];

	const [folders, filesList] = files;
	const items = [];
	const combinedFiles = folders.concat(filesList);

	for (let i = 0; i < combinedFiles.length && i < maxShowItems; i++) {
		const isFolder = i < folders.length;
		items.push(
			<DirectoryItem key={i} isFolder={isFolder} name={combinedFiles[i]} />,
		);
	}

	return items;
};

const DirectoryList = () => {
	const { fileList } = useAppContext();
	const [maxShowItems, setMaxShowItems] = useState(100);

	const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
		if (scrollTop === scrollHeight - clientHeight) {
			setMaxShowItems((prev) => prev + 100);
		}
	};

	return (
		<div
			className="scrollbar flex max-h-[calc(100%_-_theme(height.16))] overflow-auto overflow-x-hidden scroll-smooth"
			onScroll={handleScroll}
		>
			<ul className="grid w-full gap-2 pl-4 pr-1.5 text-sm" role="list">
				{renderDirectoryItems(fileList, maxShowItems)}
				<span className="h-2" />
			</ul>
		</div>
	);
};

export default DirectoryList;
