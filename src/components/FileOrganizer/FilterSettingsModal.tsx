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
	const { profileList, saveProfileList } = useUserProfiles();
	const {
		profile,
		currentProfile,
		setProfile,
		currentFilter,
		changeFilter,
		editDirectory,
		selectRequiredField,
	} = useFilterSettings();

	const filter = profile?.filters;

	return (
		<Modal ref={ref} className="h-4/5 w-4/5">
			<div className="h-full max-h-full p-2">
				<header className="flex h-8 w-full">
					<span className="w-8" />
					<h1 className="flex-1 text-center text-xl font-semibold italic">
						Filter Settings
					</h1>
					<Button
						modal-closed="true"
						className="ml-auto text-red-600 hover:!text-red-500 active:!text-red-700"
						onClick={() => {
							setTimeout(() => {
								setProfile(0);
							}, 400);
						}}
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
										value={currentProfile}
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
									value={currentFilter}
									id="select_folder"
									onChange={(e) => {
										changeFilter(Number(e.target.value));
									}}
								>
									{filter?.map(({ name }, i) => {
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
									onChange={(e) => {
										editDirectory(e.target.value);
									}}
									value={filter?.at(currentFilter)?.directoryPath}
								/>
							</div>
							<div>
								<label htmlFor="required_field" className="mr-2">
									Modo de Prioridad:
								</label>
								<select
									className="h-7 w-fit rounded-md bg-neutral-800 px-2 text-sm font-semibold outline-none"
									value={filter?.at(currentFilter)?.requiredField}
									id="required_field"
									onChange={(e) => {
										if (!filter) return;
										selectRequiredField(
											e.target.value as "both" | "extensions" | "patterns",
										);
									}}
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
						<footer className="w-full pb-2">
							<button
								type="button"
								className="mx-auto block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
								onClick={() => {
									saveProfileList();
								}}
							>
								Save Change
							</button>
						</footer>
					</div>
					<NavigationPanel />
				</main>
			</div>
		</Modal>
	);
};

export default FilterSettingsModal;
