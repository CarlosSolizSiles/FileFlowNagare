import { use } from "react";
import AppContext, { CreateContext } from "@/contexts/AppContext";

// Tipo para las claves del contexto
type CreateContextKeys = keyof CreateContext;

const useAppContext = <K extends CreateContextKeys>(
	key: K,
): CreateContext[K] => {
	const context = use(AppContext);

	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}

	return context[key];
};

export default useAppContext;
