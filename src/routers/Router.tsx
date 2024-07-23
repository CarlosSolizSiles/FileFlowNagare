import useAppContext from "@hooks/useAppContext";

/**
 * pages
 */

import Home from "@/pages/Home";
import FileOrganizer from "@/pages/FileOrganizer";
import History from "@/pages/History";
import Settings from "@/pages/Settings";

const Router = () => {
	const { currentRoute } = useAppContext();
	const MathRouters = [Home, FileOrganizer, History, Settings][currentRoute];

	return <MathRouters></MathRouters>;
};

export default Router;
