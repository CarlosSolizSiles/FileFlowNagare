import ReactDOM from "react-dom/client";
import AppProvider from "./contexts/AppProvider";
import App from "./App";
import "@assets/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<App />
	</AppProvider>,
);

// Comunicación entre ventanas: Puedes usar mensajes o eventos para comunicarte entre la ventana del navegador y el popup de la extensión. Por ejemplo, puedes enviar datos desde la ventana del navegador al popup utilizando chrome.runtime.sendMessage y recibirlos en el popup utilizando chrome.runtime.onMessage
