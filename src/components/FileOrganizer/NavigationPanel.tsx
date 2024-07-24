import React, { useState } from "react";
import Button from "./Button";
import useFilterSettings from "@/hooks/useFilterSettings";

type RenderItems = (
	items: string[],
	type: "fileExtensions" | "searchPatterns",
	placeholder: string,
) => React.JSX.Element;

type HandleBlur = (
	e: React.ChangeEvent<HTMLInputElement>,
	index: number,
	type: "fileExtensions" | "searchPatterns",
) => void;

const NavigationPanel = () => {
	const { profile, currentFilter } = useFilterSettings();
	const [isExtensionsTab, setIsExtensionsTab] = useState(true);

	const filter = profile?.filters.at(currentFilter);

	const [{ fileExtensions, searchPatterns }, setData] = useState({
		fileExtensions: ["png"],
		searchPatterns: ["\\d{4}-\\d{2}-\\d{2}"],
	});

	const handleBlur: HandleBlur = (e, index, type) => {
		const target = e.target;
		if (target.value.includes("</>")) {
			setData((prevState) => {
				let updatedValue = target.value.replaceAll("</>", "");
				if (!["", " "].includes(updatedValue)) {
					prevState[type][index] = updatedValue;
					target.value = updatedValue;
				} else {
					prevState[type].splice(index, 1);
				}
				return { ...prevState };
			});
		} else {
			target.value =
				type === "fileExtensions"
					? fileExtensions[index]
					: searchPatterns[index];
		}
	};

	const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			(e.target as HTMLInputElement).value += "</>";
			(e.target as HTMLElement).blur();
		}
	};

	const handleAddNewItem = (
		e: React.KeyboardEvent<HTMLInputElement>,
		type: "fileExtensions" | "searchPatterns",
	) => {
		let value = (e.target as HTMLInputElement).value;
		if (e.key === "Enter" && !["", " "].includes(value)) {
			setData((prevState) => ({
				...prevState,
				[type]: [...prevState[type], value],
			}));
			(e.target as HTMLInputElement).value = "";
		}
	};

	const renderItems: RenderItems = (items, type, placeholder) => (
		<>
			{items?.map((item, index) => (
				<span key={index}>
					<input
						className="h-6 w-full bg-transparent outline-none"
						spellCheck="false"
						defaultValue={item}
						onKeyDown={handleEnterKeyPress}
						onBlur={(e) => handleBlur(e, index, type)}
					/>
				</span>
			))}
			<span>
				<input
					className="h-6 w-full bg-transparent outline-none placeholder:text-neutral-200/20"
					spellCheck="false"
					placeholder={placeholder}
					onKeyDown={(e) => handleAddNewItem(e, type)}
				/>
			</span>
			<span />
		</>
	);

	return (
		<div className="flex h-full w-72 flex-col overflow-hidden rounded-md bg-neutral-600/50 shadow-lg">
			<main
				className={`-x-[-50%] flex h-full w-[200%] flex-1 overflow-hidden transition-all duration-300 ${
					isExtensionsTab ? "" : "-translate-x-1/2"
				}`}
			>
				<div
					className={`scrollbar grid h-min max-h-full w-full gap-1 divide-y-[1px] divide-neutral-500 px-2 py-1 ${
						isExtensionsTab ? "overflow-auto" : "overflow-hidden"
					}`}
				>
					{isExtensionsTab &&
						renderItems(
							filter?.fileExtensions ?? [],
							"fileExtensions",
							"añadir una nueva extensión",
						)}
				</div>
				<div
					className={`scrollbar grid h-min max-h-full w-full gap-1 divide-y-[1px] divide-neutral-500 px-2 py-1 ${
						isExtensionsTab ? "overflow-hidden" : "overflow-auto"
					}`}
				>
					{!isExtensionsTab &&
						renderItems(
							filter?.searchPatterns ?? [],
							"searchPatterns",
							"añadir un nuevo patrón",
						)}
				</div>
			</main>
			<footer className="grid h-8 w-full grid-cols-2 grid-rows-1 place-items-center bg-neutral-400">
				<Button className="w-full" onClick={() => setIsExtensionsTab(true)}>
					Extensiones
				</Button>
				<Button className="w-full" onClick={() => setIsExtensionsTab(false)}>
					Patrones
				</Button>
			</footer>
		</div>
	);
};

export default NavigationPanel;
