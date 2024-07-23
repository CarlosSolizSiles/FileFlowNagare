import React, { useRef } from "react";
import "./dialog.css";

interface Props {
	ref?: React.RefObject<HTMLDialogElement | null>;
	children?: React.ReactNode;
	className?: string | undefined;
}

const Modal = ({ className, ref, children }: Props) => {
	const modal = ref ?? useRef<HTMLDialogElement>(null);

	const handleOnClick = (
		e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
	) => {
		let target = (e.target as Element).closest("[modal-closed='true']");

		if (target) {
			modal.current?.close();
		}
	};

	return (
		<dialog
			className={"dialog " + className}
			ref={modal}
			onClick={handleOnClick}
		>
			{children}
		</dialog>
	);
};

export default Modal;
