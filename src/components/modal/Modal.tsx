import React, { useRef } from "react";
import "./dialog.css";

interface Props {
	ref?: React.RefObject<HTMLDialogElement | null>;
	children?: React.ReactNode;
	className?: string | undefined;
	onKeyDown?: (e: React.KeyboardEvent<HTMLDialogElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLDialogElement, Element>) => void;
}

const Modal = ({ className, ref, children, onKeyDown, onBlur }: Props) => {
	const modal = ref ?? useRef<HTMLDialogElement>(null);

	const handleOnClick = (
		e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
	) => {
		let target = e.target as Element;

		if (target.tagName === "DIALOG") {
			modal.current?.close();
		}

		if (target.closest("[modal-closed='true']")) {
			modal.current?.close();
		}
	};

	return (
		<dialog
			className={"dialog " + className}
			ref={modal}
			onClick={handleOnClick}
			onKeyDown={onKeyDown}
			onBlur={onBlur}
		>
			{children}
		</dialog>
	);
};

export default Modal;
