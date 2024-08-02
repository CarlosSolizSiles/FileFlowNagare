import React, { useEffect, useRef, useState } from "react";

interface SelectProps {
	disabled?: boolean;
	placeholder?: string | undefined;
	value?: string;
	hidden?: boolean;
	onChange: (value: string) => void;
	onBlur: () => void;
	onKeyDown: (text: string) => void | { enableBlur: boolean };
	ref?: React.RefObject<HTMLInputElement | null>;
}

const InputText = ({
	disabled = false,
	placeholder,
	ref,
	value,
	hidden,
	onChange,
	onBlur,
	onKeyDown,
}: SelectProps) => {
	const input = ref ?? useRef<HTMLInputElement>(null);
	const [textValue, setTextValue] = useState<string | undefined>(value);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setTextValue(target.value);
		onChange(target.value);
	};

	useEffect(() => {
		setTextValue(value);
	}, [value]);

	return (
		<div className={`relative z-40 ${hidden ? "hidden" : ""}`}>
			<input
				type="text"
				className="select_style relative flex h-8 w-[200px] cursor-pointer items-center justify-between rounded-md border bg-neutral-800 px-3 py-2 pb-2.5 text-sm font-medium placeholder:italic placeholder:text-gray-200/30 focus:outline-none has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50"
				onChange={handleChange}
				onKeyDown={(e) => {
					const target = e.target as HTMLInputElement;
					if (e.key === "Enter" && textValue !== undefined) {
						let data = onKeyDown(textValue);
						if (data === undefined || (data !== undefined && data.enableBlur)) {
							target.blur();
						}
					}
				}}
				value={textValue}
				disabled={disabled}
				ref={input}
				onBlur={() => {
					setTextValue(value);
					onBlur();
				}}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default InputText;
