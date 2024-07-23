import { Fragment, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import useAppContext from "@hooks/useAppContext";

const NavigationDirectory = () => {
	const { navigationPath, navigateBack } = useAppContext();
	const paths = navigationPath.path.split("\\").slice(navigationPath.level);
	return (
		<div className="flex h-8 content-center items-center rounded-md bg-neutral-700 px-4 text-lg font-bold shadow-lg">
			{paths.map((path, index) => (
				<Fragment key={index}>
					{index ? <HiOutlineChevronRight className="size-6" /> : <></>}
					<span
						className={`px-1 transition-colors duration-300 ease-out ${paths.length === index + 1 ? "text-yellow-500/90" : "cursor-pointer hover:text-yellow-500/60"}`}
						onClick={() =>
							paths.length !== index + 1 &&
							navigateBack(paths.length - 1 - index)
						}
					>
						{path}
					</span>
				</Fragment>
			))}
		</div>
	);
};

export default NavigationDirectory;
