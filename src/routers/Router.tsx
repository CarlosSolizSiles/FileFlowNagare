import useRouter from "@/hooks/useRouter";

/**
 * pages
 */

import Home from "@/pages/Home";
import FileOrganizer from "@/pages/FileOrganizer";
import History from "@/pages/History";
import SettingsPage from "@/pages/Settings";

const Router = () => {
	const { current } = useRouter();
	const MathRouters = [Home, FileOrganizer, History, SettingsPage][current];

	return <MathRouters></MathRouters>;
};

export default Router;
