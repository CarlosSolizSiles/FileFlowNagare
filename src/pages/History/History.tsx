import { useRef } from "react";

import Modal from "@components/modal/Modal";

const History = () => {
	const modal = useRef<HTMLDialogElement>(null);

	return (
		<div className="relative flex h-full gap-2 p-4">
			<button
				type="button"
				className="btn-open"
				onClick={() => {
					modal.current?.showModal();
				}}
			>
				Abrir modal
			</button>
			<Modal ref={modal}>
				<h1>carlos</h1>
			</Modal>
		</div>
	);
};

export default History;
