import { createContext } from "react";
import { UseAppReducer } from "./useAppReducer";

export interface CreateContext extends UseAppReducer {}

// Crear el contexto
const AppContext = createContext({} as CreateContext);

export default AppContext;
