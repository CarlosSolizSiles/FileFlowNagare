import React, { useState } from "react";
import Button from "./Button";
import useFilterSettings from "@/hooks/useFilterSettings";

type PropsRenderItems = {
	items: string[];
	type: "fileExtensions" | "searchPatterns";
	placeholder: string;
};

type HandleBlur = (
	e: React.ChangeEvent<HTMLInputElement>,
	index: number,
	type: "fileExtensions" | "searchPatterns",
) => void;

const NavigationPanel = () => {
	const {
		profile,
		currentFilter,
		addItem,
		deleteItem,
		editItem
	} = useFilterSettings();

	const filter = profile?.filters.at(currentFilter);

	const [isExtensionsTab, setIsExtensionsTab] = useState(true);

	// useEffect(() => {
	// 	console.log(profile?.filters.at(currentFilter));

	// 	setFilter(profile?.filters.at(currentFilter));
	// }, [profile, currentFilter]);

	const handleBlur: HandleBlur = (e, index, type) => {
		const target = e.target;
		if (target.value.includes("</>")) {
			let updatedValue = target.value.replaceAll("</>", "");
			if (!["", " "].includes(updatedValue)) {
				editItem(type, index, updatedValue);
				target.value = updatedValue;
			} else {
				deleteItem(type, index);
			}
		} else {
			target.value =
				type === "fileExtensions"
					? (filter?.fileExtensions ?? [])[index]
					: (filter?.searchPatterns ?? [])[index];
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
			addItem(type, value);

			(e.target as HTMLInputElement).value = "";
		}
	};

	const RenderItems = ({ items, type, placeholder }: PropsRenderItems) => (
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
					{isExtensionsTab && (
						<RenderItems
							items={filter?.fileExtensions ?? []}
							placeholder="añadir una nueva extensión"
							type="fileExtensions"
						></RenderItems>
					)}
				</div>
				<div
					className={`scrollbar grid h-min max-h-full w-full gap-1 divide-y-[1px] divide-neutral-500 px-2 py-1 ${
						isExtensionsTab ? "overflow-hidden" : "overflow-auto"
					}`}
				>
					{!isExtensionsTab && (
						<RenderItems
							items={filter?.searchPatterns ?? []}
							placeholder="añadir un nuevo patrón"
							type="searchPatterns"
						></RenderItems>
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
