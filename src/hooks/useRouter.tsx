import useAppContext from "./useAppContext";

const useRouter = () => {
	const router = useAppContext("router");
	return router;
};

export default useRouter;
