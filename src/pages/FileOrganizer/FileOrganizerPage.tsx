import { useRef } from "react";

// Hooks
import useProfileHook from "@/hooks/useProfileHook";
import useCreateFilter from "@/hooks/useCreateFilter";

// Componentes
import Modal from "@components/Modal";
import Button from "@components/Button";
import Filter from "@components/Filter";
import Control from "./Control";

// Iconos
import {
	IoFunnelOutline as FilterIcon,
	IoSettingsOutline as SettingsIcon,
} from "react-icons/io5";
import { BsDoorClosed as DoorClosedIcon } from "react-icons/bs";

const FileOrganizerPage = () => {
	const { profileList, selectedProfileIndex, eventProfile, filterSettings } =
		useProfileHook();
	const { filterList, eventFilter, selectedFilterIndex, resetFilter } =
		useCreateFilter(filterSettings);

	const modalRef = useRef<HTMLDialogElement>(null);

	const openModal = () => modalRef.current?.showModal();

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
						<div className="flex flex-1 flex-col gap-3 bg-red-400/0">
							<div className="w-full bg-neutral-400/0">
								<div className="flex flex-1 gap-2 bg-blue-400/0">
									<Control
										list={filterList}
										selectedIndex={selectedFilterIndex}
										placeholder="Filter"
										event={eventFilter}
									></Control>
								</div>
							</div>
							<div className="flex-1 bg-neutral-700/40">
								{selectedFilterIndex !== undefined &&
									filterSettings
										?.at(selectedFilterIndex)
										?.regexPatterns.map((x) => {
											return <input type=""/>;
										})}
							</div>
						</div>
						<div className="mt-6 flex justify-end gap-2">
							<button
								type="button"
								className="rounded-md bg-red-500 p-1 px-4 text-base font-medium text-white shadow-md"
								onClick={resetFilter}
							>
								Cancel Changes
							</button>
							<button
								type="button"
								className="rounded-md bg-blue-500 p-1 px-4 text-base font-medium text-white shadow-md"
								onClick={() => {}}
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</Modal>

			<div className="flex h-fit bg-red-200/0">
				<div className="flex flex-1 gap-2 bg-blue-400/0">
					<Control
						list={profileList}
						selectedIndex={selectedProfileIndex}
						placeholder="Profile"
						event={eventProfile}
					></Control>
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
