import { useEffect, useRef, useState } from "react";

// Componentes
import InputText from "@/components/InputText";
import Select from "@/components/Select";
import Button from "@components/Button";

// Iconos
import {
	IoAddOutline as AddIcon,
	IoBrushOutline as EditIcon,
	IoTrashBinOutline as DeleteIcon,
} from "react-icons/io5";

export type ActionsEvent =
	| { type: "switch"; payload: number }
	| { type: "add"; payload: string }
	| { type: "delete"; payload: number }
	| { type: "edit"; payload: { index: number; name: string } };

interface ControlProps {
	list: string[];
	selectedIndex?: number;
	placeholder: string;
	event: (action: ActionsEvent) => void;
}

const Control = ({ selectedIndex, list, placeholder, event }: ControlProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [state, setState] = useState({
		isEditing: false,
		isInputEnabled: false,
		isButtonHovered: false,
	});

	const { isEditing, isInputEnabled, isButtonHovered } = state;

	useEffect(() => {
		if (isInputEnabled) inputRef.current?.focus();
	}, [isInputEnabled, isButtonHovered]);

	const handleAction = (action: "add" | "edit") => {
		if (selectedIndex !== undefined || isButtonHovered) {
			setState({
				...state,
				isEditing: action === "edit",
				isInputEnabled: true,
				isButtonHovered: true,
			});
			inputRef.current?.focus();
		}
	};

	const handleDelete = () => {
		if (selectedIndex !== undefined) {
			event({ type: "delete", payload: selectedIndex });
		}
	};

	const handleInputKeyDown = (text: string) => {
		if (isEditing && selectedIndex !== undefined) {
			event({
				type: "edit",
				payload: { index: selectedIndex, name: text },
			});
		} else {
			event({
				type: "add",
				payload: text,
			});
		}
		setState({ ...state, isButtonHovered: false, isInputEnabled: false });
	};

	const handleInputBlur = () => {
		if (!isButtonHovered) {
			setState({ ...state, isInputEnabled: false });
		}
	};

	const handleMouseHover = (hovered: boolean) => {
		setState({ ...state, isButtonHovered: hovered });
	};

	const handleSwitch = (value: number) => {
		event({
			type: "switch",
			payload: value,
		});
	};

	return (
		<>
			<Select
				disabled={list.length === 0}
				value={selectedIndex}
				listOptions={list}
				onChange={handleSwitch}
				hidden={isInputEnabled}
				placeholder={`Select ${placeholder}`}
			/>

			<InputText
				ref={inputRef}
				onChange={() => {}}
				onKeyDown={handleInputKeyDown}
				onBlur={handleInputBlur}
				value={
					isEditing
						? selectedIndex !== undefined
							? list[selectedIndex]
							: ""
						: ""
				}
				placeholder={
					isInputEnabled
						? isEditing
							? `Rename ${placeholder}...`
							: "Enter a Name..."
						: undefined
				}
				hidden={!isInputEnabled}
			/>
			<Button
				IconComponent={AddIcon}
				onClick={() => handleAction("add")}
				onMouseEnter={() => handleMouseHover(true)}
				onMouseLeave={() => handleMouseHover(false)}
			></Button>
			<Button
				IconComponent={DeleteIcon}
				onClick={handleDelete}
				disabled={list.length === 0 || selectedIndex === undefined}
			></Button>
			<Button
				IconComponent={EditIcon}
				onClick={() => handleAction("edit")}
				disabled={list.length === 0 || selectedIndex === undefined}
				onMouseEnter={() => handleMouseHover(true)}
				onMouseLeave={() => handleMouseHover(false)}
			></Button>
		</>
	);
};

export default Control;
