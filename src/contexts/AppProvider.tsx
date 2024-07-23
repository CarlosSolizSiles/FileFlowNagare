import AppContext from "./AppContext";
import useAppReducer from "./useAppReducer";

// Definir el proveedor del contexto
const AppProvider = ({ children }: { children?: React.ReactNode }) => {
	const appStore = useAppReducer();

	return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export default AppProvider;
