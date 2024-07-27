import "./style.css";
import React, { useEffect, useId, useState } from "react";

interface SelectProps {
	disabled?: boolean;
	listOptions: string[];
	value?: number;
	hidden?: boolean;
	onChange: (value: number) => void;
}

const Select = ({
	disabled = false,
	listOptions,
	value,
	hidden,
	onChange,
}: SelectProps) => {
	const [selectedValue, setSelectedValue] = useState<number | undefined>(value);
	const id = useId();

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLElement;
		const optionValue = target.getAttribute("data-option-value");

		if (!optionValue) return;

		setSelectedValue(Number(optionValue));
		onChange(Number(optionValue));
	};

	const selectedText =
		selectedValue !== undefined
			? listOptions.at(selectedValue)
			: "Seleciona un Perfil";

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	return (
		<div className={`relative z-40 ${hidden ? "hidden" : ""}`}>
			<label
				className="select_style relative flex h-8 w-[200px] cursor-pointer items-center justify-between rounded-md border bg-neutral-800 px-3 py-2 text-sm font-medium has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50"
				htmlFor={id}
				onClick={handleClick}
				onKeyDown={(e) => {
					const target = e.target as HTMLInputElement;

					if (/Enter|(\s)/.test(e.key) && target.tagName === "LABEL") {
						(target.children[0] as HTMLInputElement).checked = !(
							target.children[0] as HTMLInputElement
						).checked;
					}
				}}
				tabIndex={0}
				onBlur={(e) => {
					const target = e.target as HTMLElement;
					(target.children[0] as HTMLInputElement).checked = false;
				}}
			>
				<input
					type="checkbox"
					id={id}
					className="hidden [&~svg]:checked:rotate-0"
					disabled={disabled}
					tabIndex={-1}
				/>
				{selectedText}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-4 w-4 rotate-180 transition-[transform] duration-150 ease-linear"
					aria-hidden="true"
				>
					<path d="m6 9 6 6 6-6"></path>
				</svg>
				<div className="w-full rounded-b-md bg-neutral-700 text-base shadow-lg">
					{listOptions.map((text, i) => (
						<div
							key={text}
							className="px-2 font-normal hover:rounded-md hover:bg-amber-300 hover:text-black"
							data-option-value={i}
						>
							{text}
						</div>
					))}
				</div>
			</label>
		</div>
	);
};

export default Select;
