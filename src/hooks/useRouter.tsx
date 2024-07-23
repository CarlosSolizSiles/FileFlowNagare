import { use } from "react";
import AppContext from "@/contexts/AppContext";

const useRouter = () => {
	const { router } = use(AppContext);
	return router;
};

export default useRouter;
