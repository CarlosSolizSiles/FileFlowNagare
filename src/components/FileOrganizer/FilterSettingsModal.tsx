import { FaRegEdit, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import Button from "./Button";
import { CgClose } from "react-icons/cg";
import Modal from "../modal/Modal";
import NavigationPanel from "./NavigationPanel";
import useFilterSettings from "@/hooks/useFilterSettings";
import useUserProfiles from "@/hooks/useUserProfiles";

interface FilterSettingsModalProps {
	ref?: React.RefObject<HTMLDialogElement | null>;
}

const FilterSettingsModal = ({ ref }: FilterSettingsModalProps) => {
	const { profileList } = useUserProfiles();
	const { profile, currentProfile, setProfile, currentFilter, changeFilter } =
		useFilterSettings();

	const filter = profile?.filters.at(currentFilter);

	return (
		<Modal ref={ref} className="max-h-4/5 h-4/5 w-4/5 p-2">
			<header className="flex h-8 w-full">
				<span className="w-8" />
				<h1 className="flex-1 text-center text-xl font-semibold italic">
					Filter Settings
				</h1>
				<Button
					modal-closed="true"
					className="ml-auto text-red-600 hover:!text-red-500 active:!text-red-700"
				>
					<CgClose className="size-full" />
				</Button>
			</header>

			<main className="mt-2 flex h-full max-h-[calc(100%_-2.5rem)] flex-1 gap-2 px-2 pb-2">
				<div className="flex flex-1 flex-col">
					<header>
						<ul className="flex items-center">
							<li className="mr-2 max-w-80 flex-1">
								<select
									className="h-7 w-full max-w-80 rounded-md bg-neutral-800 px-2 text-sm font-semibold outline-none"
									defaultValue={currentProfile}
									id="select_profile"
									onChange={(e) => {
										setProfile(Number(e.target.value));
									}}
								>
									<optgroup
										label="Select a Profile"
										className="bg-white italic"
									>
										{profileList?.map(({ name }, i) => (
											<option key={i} value={i}>
												{name}
											</option>
										))}
									</optgroup>
								</select>
							</li>
							<li className="size-8">
								<Button>
									<FaRegPlusSquare className="size-full" />
								</Button>
							</li>
							<li className="size-8">
								<Button>
									<FaRegEdit className="size-full" />
								</Button>
							</li>
							<li className="size-8">
								<Button>
									<FaRegTrashAlt className="size-full" />
								</Button>
							</li>
						</ul>
					</header>
					<main className="flex-1 divide-y-8 divide-transparent p-2 py-4 font-semibold">
						<div className="flex">
							<label htmlFor="select_folder" className="mr-2">
								Carpeta:
							</label>
							<select
								className="h-7 w-full max-w-72 flex-1 rounded-md bg-neutral-800 px-2 text-sm font-semibold outline-none"
								defaultValue={currentFilter}
								id="select_folder"
								onChange={(e) => {
									changeFilter(Number(e.target.value));
								}}
							>
								{profile?.filters.map(({ name }, i) => {
									return (
										<option key={i} value={i} className="bg-white">
											{name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="flex">
							<label htmlFor="directory_path" className="mr-2">
								Ubicacion:
							</label>
							<input
								type="text"
								className="h-7 w-full max-w-72 flex-1 rounded-md bg-neutral-800 px-2 text-sm font-semibold outline-none"
								id="directory_path"
								value={filter?.directoryPath}
							/>
						</div>
						<div>
							<label htmlFor="required_field" className="mr-2">
								Modo de Prioridad:
							</label>
							<select
								className="h-7 w-fit rounded-md bg-neutral-800 px-2 text-sm font-semibold outline-none"
								value={filter?.requiredField}
								id="required_field"
							>
								<option value={"both"} className="bg-white">
									both
								</option>
								<option value={"extensions"} className="bg-white">
									extensions
								</option>
								<option value={"patterns"} className="bg-white">
									patterns
								</option>
							</select>
						</div>
					</main>
				</div>
				<NavigationPanel />
			</main>
		</Modal>
	);
};

export default FilterSettingsModal;
