import AppContext from "./AppContext";
import useReducerCustom from "./useAppReducer";

// Definir el proveedor del contexto
const AppProvider = ({ children }: { children?: React.ReactNode }) => {
	const appStore = useReducerCustom();

	return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export default AppProvider;
