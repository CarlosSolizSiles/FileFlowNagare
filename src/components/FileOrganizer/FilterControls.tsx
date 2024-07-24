import { GrFilter } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import Button from "./Button";
import useUserProfiles from "@hooks/useUserProfiles";

interface FilterControlsProps {
	applyFileFilter: () => void;
	toggleSettingsModal: (
		arg: boolean | ((prevState: boolean) => boolean),
	) => void;
}

const FilterControls = ({
	applyFileFilter,
	toggleSettingsModal,
}: FilterControlsProps) => {
	const { profileList, selectedProfile, switchProfile } = useUserProfiles();

	return (
		<ul className="flex h-8 gap-2">
			<li className="flex-1">
				<Button onClick={applyFileFilter}>
					<GrFilter className="size-full" />
				</Button>
			</li>
			<li className="ml-auto flex items-center justify-center gap-1">
				<select
					className="h-7 w-48 rounded-md bg-neutral-700 px-2 text-sm font-semibold outline-none"
					defaultValue={selectedProfile}
					disabled={profileList?.length === 0}
					onChange={(e) => {
						// console.log();

						switchProfile(Number(e.target.value));
					}}
				>
					<optgroup label="Select a Profile" className="bg-white italic">
						{profileList?.map(({ name }, index) => {
							return (
								<option key={index} value={index}>
									{name}
								</option>
							);
						})}
					</optgroup>
				</select>
				<Button onClick={() => toggleSettingsModal(false)}>
					<IoSettingsOutline className="size-full" />
				</Button>
			</li>
		</ul>
	);
};

export default FilterControls;
