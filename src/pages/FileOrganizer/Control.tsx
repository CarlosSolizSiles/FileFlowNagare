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

const Control = ({
	selectedIndex: select,
	list: array,
	placeholder,
	event,
}: ControlProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [{ list, selectedIndex }, setStore] = useState({
		selectedIndex: select,
		list: array,
	});

	const [state, setState] = useState({
		isEditing: false,
		isInputEnabled: false,
		isButtonHovered: false,
	});

	useEffect(() => {
		setStore({
			selectedIndex: select,
			list: array,
		});
	}, [list, selectedIndex]);

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
			setStore({
				selectedIndex: select,
				list: array,
			});
		}
	};

	const handleInputKeyDown = (text: string) => {
		if (isEditing && selectedIndex !== undefined) {
			event({
				type: "edit",
				payload: { index: selectedIndex, name: text },
			});
			setStore({
				selectedIndex: select,
				list: array,
			});
		} else {
			event({
				type: "add",
				payload: text,
			});
			setStore({
				selectedIndex: select,
				list: array,
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
		setStore({
			selectedIndex: select,
			list: array,
		});
	};
	
	console.log(list);
	return (
		<>
			<Select
				disabled={list.length === 0 || selectedIndex === undefined}
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
