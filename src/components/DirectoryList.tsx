import React, { useRef, useState } from "react";
import { AiFillFile, AiFillFolder } from "react-icons/ai";
import useNavigation from "@hooks/useNavigation";
import useFileSystem from "@hooks/useFileSystem";
import Modal from "./modal/Modal";

const Previous = ({ src }: { src: string }) => {
	let format = src?.split(".")?.at(-1) ?? "";

	if (["png", "jpg", "webp", "bmp", "jpeg", "gif", "svg"].includes(format)) {
		return <img src={src} alt="" className="aspect-auto h-auto max-h-full" />;
	} else if (["mp4", "mp3"].includes(format)) {
		return (
			<video
				src={src}
				className="h-full"
				onLoadedData={(e) => {
					const target = e.target as HTMLVideoElement;
					target.volume = 0.5;
					target.play();
				}}
				onWheel={(e) => {
					const target = e.target as HTMLVideoElement;
					if (e.deltaY < 0 && target.volume < 1) {
						target.volume = Math.min(target.volume + 0.1, 1); // Asegurarse de que no exceda 1
					} else if (e.deltaY > 0 && target.volume > 0) {
						target.volume = Math.max(target.volume - 0.1, 0); // Asegurarse de que no sea menor a 0
					}
				}}
			/>
		);
	}

	return <>formato {format.toLocaleUpperCase()} no sorportado</>;
};

const DirectoryItem = ({
	name,
	isFolder,
	index,
}: {
	name: string;
	isFolder: boolean;
	index: number;
}) => {
	const { updateNavigationPath } = useNavigation();
	const { selectFile } = useFileSystem();
	return (
		<li
			className="h-8 w-full overflow-hidden text-ellipsis text-nowrap rounded-md bg-neutral-700 pr-2 shadow-lg"
			title={name}
			onClick={() => {
				if (isFolder) {
					updateNavigationPath(name);
				} else {
					selectFile(index);
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
			<DirectoryItem
				key={i}
				isFolder={isFolder}
				name={combinedFiles[i]}
				index={i - folders.length}
			/>,
		);
	}

	return items;
};

const DirectoryList = () => {
	const { fileList, selectTargetFile, selectFile } = useFileSystem();
	const { path } = useNavigation();
	const [maxShowItems, setMaxShowItems] = useState(100);
	const modal = useRef<HTMLDialogElement>(null);

	const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
		if (scrollTop === scrollHeight - clientHeight) {
			setMaxShowItems((prev) => prev + 100);
		}
	};
	if (selectTargetFile !== undefined) {
		modal.current?.showModal();
	}

	return (
		<>
			<div
				className="scrollbar flex max-h-[calc(100%_-_theme(height.16))] overflow-auto overflow-x-hidden scroll-smooth"
				onScroll={handleScroll}
			>
				<ul className="grid w-full gap-2 pl-4 pr-1.5 text-sm" role="list">
					{renderDirectoryItems(fileList, maxShowItems)}
					<span className="h-2" />
				</ul>
			</div>
			<Modal
				ref={modal}
				className="h-[80%] w-[80%]"
				onBlur={(e) => {
					setTimeout(() => {
						if (
							e.target.tagName === "DIALOG" &&
							e.target.closest("dialog")?.getAttribute("open") !== ""
						) {
							selectFile(undefined);
						}
					}, 450);
				}}
				onKeyDown={(e) => {
					if (selectTargetFile === undefined) return;

					if (e.key === "ArrowRight") {
						selectFile(
							selectTargetFile === fileList[1].length - 1
								? 0
								: selectTargetFile + 1,
						);
					} else if (e.key == "ArrowLeft") {
						selectFile(
							selectTargetFile === 0
								? fileList[1].length - 1
								: selectTargetFile - 1,
						);
					} else if (e.key == " ") {
						let target = (e.target as HTMLElement).querySelector("video");
						if (target) {
							if (target.paused) {
								target.play();
							} else {
								target.pause();
							}
						}
					}
				}}
			>
				<div className="flex size-full items-center justify-center">
					<Previous
						src={
							selectTargetFile !== undefined
								? "http://localhost:10000/api/file_system/file/" +
									path +
									"/" +
									fileList[1].at(selectTargetFile)
								: ""
						}
					/>
				</div>
			</Modal>
		</>
	);
};

export default DirectoryList;
