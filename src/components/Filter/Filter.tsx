import useProfileHook from "@/hooks/useProfileHook";
import { filterFiles } from "./filterFiles";
import { useEffect } from "react";

const Filter = () => {
	const { filterSettings } = useProfileHook();

	useEffect(() => {
		const promise = filterFiles(
			["index.html", "Trabajo.pdf"],
			filterSettings?.at(0),
		);
		promise
			.then(({ matchedFiles, unmatchedFiles }) => {
				console.table({ matchedFiles, unmatchedFiles });
			})
			.catch(() => {
				console.error("There is no filter setting.");
			});
	}, [filterSettings]);

	return (
		<div className="size-full bg-neutral-700">
			{filterSettings?.map(({ name }, i) => {
				return <div key={i}>{name}</div>;
			})}
		</div>
	);
};

export default Filter;
