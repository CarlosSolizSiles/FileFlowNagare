import { useEffect, useRef, useState } from "react";

// Hooks
import useProfileHook from "@/hooks/useProfileHook";

// Componentes
import InputText from "@components/InputText";
import Modal from "@components/Modal";
import Select from "@components/Select";
import Button from "@components/Button";
import Filter from "@components/Filter";

// Iconos
import {
	IoAddOutline as AddIcon,
	IoBrushOutline as EditIcon,
	IoFunnelOutline as FilterIcon,
	IoSettingsOutline as SettingsIcon,
	IoTrashBinOutline as DeleteIcon,
} from "react-icons/io5";
import { BsDoorClosed as DoorClosedIcon } from "react-icons/bs";
// import Control from "./Control";

const FileOrganizerPage = () => {
	const {
		isEmptyProfileList,
		profileList,
		selectedProfileIndex,
		switchProfile,
		addProfile,
		editProfile,
		deleteProfile,
		eventProfile,
	} = useProfileHook();

	const modalRef = useRef<HTMLDialogElement>(null);
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

	const openModal = () => modalRef.current?.showModal();

	const handleProfileAction = (action: "add" | "edit") => {
		if (selectedProfileIndex !== undefined || isButtonHovered) {
			setState({
				...state,
				isEditing: action === "edit",
				isInputEnabled: true,
				isButtonHovered: true,
			});
			inputRef.current?.focus();
		}
	};

	const handleDeleteProfile = () => {
		if (selectedProfileIndex !== undefined) {
			eventProfile({ type: "delete", payload: selectedProfileIndex });

			// deleteProfile(selectedProfileIndex);
		}
	};

	const handleInputKeyDown = (text: string) => {
		if (isEditing && selectedProfileIndex !== undefined) {
			eventProfile({
				type: "edit",
				payload: { index: selectedProfileIndex, name: text },
			});

			// editProfile(selectedProfileIndex, text);
		} else {
			eventProfile({ type: "add", payload: text });
			// addProfile(text);
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

	const handleSwitchProfile = (value: number) => {
		eventProfile({ type: "switch", payload: value });
	};

	return (
		<div className="relative flex h-full flex-col gap-4 p-4">
			<Modal
				ref={modalRef}
				className="h-4/6 w-[600px] bg-neutral-800 shadow-lg"
				backdrop="enable"
			>
				<div className="flex h-full items-center justify-center">
					<div className="bg-card flex h-full w-[600px] flex-col rounded-lg p-6 shadow-lg">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-bold">Filter Settings</h2>
							<button className="text-red-500" modal-closed="true">
								<DoorClosedIcon className="h-6 w-6" />
							</button>
						</div>
						<div className="grid flex-1 grid-cols-2 gap-6 bg-red-400/0">
							<div className="col-span-2 w-full space-y-4">
								<div className="flex flex-1 gap-2 bg-blue-400/0">
									{/* <Control
										list={profileList}
										selectedIndex={selectedProfileIndex}
										placeholder="Profile"
										event={(action) => {
											switch (action.type) {
												case "switch":
													switchProfile(action.payload);
													break;

												case "add":
													addProfile(action.payload);
													break;

												case "delete":
													deleteProfile(action.payload);
													break;

												case "edit":
													editProfile(
														action.payload.index,
														action.payload.name,
													);
													break;

												default:
													break;
											}
										}}
									></Control> */}
								</div>
							</div>
							<div className="space-y-4">
								<div className="space-y-2"></div>
								<div className="flex space-x-2"></div>
							</div>
						</div>
						<div className="mt-6 flex justify-end">
							<button
								type="button"
								className="rounded-md bg-blue-500 p-1 px-4 text-base font-medium text-white shadow-md"
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</Modal>

			<div className="flex h-fit bg-red-200/0">
				<div className="flex flex-1 gap-2 bg-blue-400/0">
					<Select
						disabled={isEmptyProfileList}
						value={selectedProfileIndex}
						listOptions={profileList}
						onChange={handleSwitchProfile}
						hidden={isInputEnabled}
						placeholder="Select Profile"
					/>

					<InputText
						ref={inputRef}
						onChange={() => {}}
						onKeyDown={handleInputKeyDown}
						onBlur={handleInputBlur}
						value={
							isEditing
								? selectedProfileIndex !== undefined
									? profileList[selectedProfileIndex]
									: "Select a Profile"
								: ""
						}
						placeholder={
							isInputEnabled
								? isEditing
									? "Rename Profile..."
									: "Enter a Name..."
								: undefined
						}
						hidden={!isInputEnabled}
					/>
					<Button
						IconComponent={AddIcon}
						onClick={() => handleProfileAction("add")}
						onMouseEnter={() => handleMouseHover(true)}
						onMouseLeave={() => handleMouseHover(false)}
					></Button>
					<Button
						IconComponent={DeleteIcon}
						onClick={handleDeleteProfile}
						disabled={isEmptyProfileList || selectedProfileIndex === undefined}
					></Button>
					<Button
						IconComponent={EditIcon}
						onClick={() => handleProfileAction("edit")}
						disabled={isEmptyProfileList || selectedProfileIndex === undefined}
						onMouseEnter={() => handleMouseHover(true)}
						onMouseLeave={() => handleMouseHover(false)}
					></Button>
				</div>
				<div className="ml-auto flex gap-2 bg-neutral-800/0">
					<Button IconComponent={FilterIcon}></Button>
					<Button IconComponent={SettingsIcon} onClick={openModal}></Button>
				</div>
			</div>

			<div className="flex flex-1 bg-red-400/0">
				<div className="flex-1 bg-blue-400">
					<Filter />
				</div>
				<div className="w-1/3 min-w-80 bg-red-300"></div>
			</div>
		</div>
	);
};

export default FileOrganizerPage;
