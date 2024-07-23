import useRouter from "@/hooks/useRouter";

/**
 * pages
 */

import Home from "@/pages/Home";
import FileOrganizer from "@/pages/FileOrganizer";
import History from "@/pages/History";
import Settings from "@/pages/Settings";

const Router = () => {
	const { current: currentRoute } = useRouter();
	const MathRouters = [Home, FileOrganizer, History, Settings][currentRoute];

	return <MathRouters></MathRouters>;
};

export default Router;
