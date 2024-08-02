import ReactDOM from "react-dom/client";
// import AppProvider from "./contexts/AppProvider";
import App from "./App";
import "@assets/index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		{/* <AppProvider> */}
			<App />
		{/* </AppProvider> */}
	</Provider>,
);

// Comunicación entre ventanas: Puedes usar mensajes o eventos para comunicarte entre la ventana del navegador y el popup de la extensión. Por ejemplo, puedes enviar datos desde la ventana del navegador al popup utilizando chrome.runtime.sendMessage y recibirlos en el popup utilizando chrome.runtime.onMessage
// SELECT `id`, `calificacion`, `id_alumno`, `id_materia`, `instancia`, `nombre`, `fecha_inicial_modificable` FROM `nota` WHERE id_materia = 5 & instancia = "JULIO"