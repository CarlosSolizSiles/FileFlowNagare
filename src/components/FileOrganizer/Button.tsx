interface Props {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string | undefined;
}

const Button = (props: Props) => {
	return (
		<button
			type="button"
			{...props}
			onClick={props.onClick}
			className={
				"aspect-square h-full rounded-md p-1 text-blue-600 transition-colors duration-300 ease-in-out hover:text-sky-500 active:text-sky-800 " +
				props.className
			}
		>
			{props.children}
		</button>
	);
};

export default Button;
