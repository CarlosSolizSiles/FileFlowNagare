import { useEffect, useRef, useState } from "react";

// Hooks
import useProfile from "@/hooks/useProfile";

// Componentes
import InputTextComponent from "@/components/InputText";
import ModalComponent from "@/components/modal/Modal";
import SelectComponent from "@/components/Select";

// Iconos
import { BsDoorClosed } from "react-icons/bs";
import {
	IoAddOutline,
	IoBrushOutline,
	IoFunnelOutline,
	IoSettingsOutline,
	IoTrashBinOutline,
} from "react-icons/io5";

const SettingsPage = () => {
	const {
		isEmptylist,
		profileList,
		selectedIndex,
		switchProfile,
		add,
		edit,
		remove,
	} = useProfile();

	const modalDialogRef = useRef<HTMLDialogElement>(null);
	const inputElementRef = useRef<HTMLInputElement>(null);
	const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
	const [isAddingProfile, setIsAddingProfile] = useState<boolean>(false);
	const [enableInputElement, setEnableInputElement] = useState<boolean>(false);

	useEffect(() => {
		if (isEditingProfile || isAddingProfile) inputElementRef.current?.focus();
	}, [isEditingProfile, isAddingProfile]);

	// Manejadores de eventos
	const handleShowModal = () => modalDialogRef.current?.showModal();

	const handleAddProfile = () => {
		setIsAddingProfile(true);
		setIsEditingProfile(false);
	};

	const handleEditProfile = () => {
		if (selectedIndex !== undefined) {
			setEnableInputElement(true);
			// setIsEditingProfile(true);
			// setIsAddingProfile(false);
		}
	};

	const handleDeleteProfile = () => {
		if (selectedIndex !== undefined && !isAddingProfile) {
			remove(selectedIndex);
		}
	};

	const handleInputKeyDown = (text: string) => {
		if (isAddingProfile) {
			add(text);
		} else if (selectedIndex !== undefined) {
			edit(selectedIndex, text);
		}
	};

	const handleInputBlur = () => {
		setIsEditingProfile(false);
		setIsAddingProfile(false);
	};

	return (
		<div className="relative flex h-full flex-col gap-4 p-4">
			{/* Sección del Modal */}
			<ModalComponent
				ref={modalDialogRef}
				className="h-4/6 w-[600px] shadow-lg"
				backdrop="enable"
			>
				<div className="flex h-full items-center justify-center">
					<div className="bg-card flex h-full w-[600px] flex-col rounded-lg p-6 shadow-lg">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-bold">Filter Settings</h2>
							<button className="text-red-500" modal-closed="true">
								<BsDoorClosed className="h-6 w-6" />
							</button>
						</div>
						<div className="grid flex-1 grid-cols-2 gap-6 bg-red-400">
							<div className="space-y-4">
								<div className="space-y-2"></div>
								<div className="space-y-2"></div>
								<div className="space-y-2"></div>
								<div className="space-y-2"></div>
							</div>
							<div className="space-y-4">
								<div className="space-y-2"></div>
								<div className="flex space-x-2"></div>
							</div>
						</div>
						<div className="mt-6 flex justify-end">
							<div>
								<button
									type="button"
									role="button"
									className="rounded-md bg-blue-500 p-1 px-4 text-base font-medium text-white shadow-md"
								>
									Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</ModalComponent>

			{/* Sección de Barra Superior */}
			<div className="flex h-fit bg-red-200/0">
				<div className="flex flex-1 bg-blue-400/0">
					<SelectComponent
						disabled={isEmptylist}
						value={selectedIndex}
						listOptions={profileList}
						onChange={switchProfile}
						hidden={isEditingProfile || isAddingProfile}
					/>

					<InputTextComponent
						ref={inputElementRef}
						onChange={() => {}}
						onKeyDown={handleInputKeyDown}
						onBlur={handleInputBlur}
						value={
							isAddingProfile
								? ""
								: selectedIndex !== undefined
									? profileList[selectedIndex]
									: "Select a Profile"
						}
						placeholder={
							isAddingProfile || isEditingProfile
								? isAddingProfile
									? "Ingrese un Nombre..."
									: "Renombra el Perfil..."
								: undefined
						}
						hidden={!(isEditingProfile || isAddingProfile)}
					/>

					<div>
						<button
							type="button"
							role="button"
							className="aspect-square size-8 rounded-md p-1 shadow-md disabled:text-red-500"
							onClick={handleAddProfile}
						>
							<IoAddOutline className="size-full" />
						</button>
					</div>
					<div>
						<button
							type="button"
							role="button"
							className="aspect-square size-8 rounded-md p-1 shadow-md disabled:text-red-500"
							disabled={isEmptylist}
							onClick={handleDeleteProfile}
						>
							<IoTrashBinOutline className="size-full" />
						</button>
					</div>
					<div>
						<button
							type="button"
							role="button"
							className="aspect-square size-8 rounded-md p-1 shadow-md disabled:text-red-500"
							disabled={isEmptylist}
							onClick={handleEditProfile}
						>
							<IoBrushOutline className="size-full" />
						</button>
					</div>
				</div>
				<div className="ml-auto flex gap-2 bg-neutral-800/0">
					<div>
						<button
							type="button"
							role="button"
							className="aspect-square size-8 rounded-md p-1 shadow-md"
						>
							<IoFunnelOutline className="size-full" />
						</button>
					</div>
					<div>
						<button
							type="button"
							role="button"
							className="aspect-square size-8 rounded-md p-1 shadow-md"
							onClick={handleShowModal}
						>
							<IoSettingsOutline className="size-full" />
						</button>
					</div>
				</div>
			</div>

			{/* Sección de Contenido Principal */}
			<div className="flex flex-1 bg-red-400/0">
				{/* Panel Izquierdo */}
				<div className="flex-1 bg-blue-400"></div>

				{/* Panel Derecho */}
				<div className="w-1/3 min-w-80 bg-red-300"></div>
			</div>
		</div>
	);
};

export default SettingsPage;
