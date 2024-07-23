import AsideBar from "@components/AsideBar";
import Router from "@/routers/Router";

function App() {
	return (
		<div>
			<header className="flex h-14 items-center rounded-b-lg bg-blue-900/60 px-5 shadow-xl">
				<AsideBar />
			</header>
			<main className="relative h-[calc(theme(height.screen)_-_theme(space.14))]">
				<Router />
			</main>
		</div>
	);
}

export default App;
