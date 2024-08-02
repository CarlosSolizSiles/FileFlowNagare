interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	IconComponent: React.ElementType;
}
const Button = ({
	IconComponent,
	onClick,
	disabled,
	onMouseLeave,
	onMouseEnter,
}: ButtonProps) => {
	return (
		<button
			type="button"
			className="hover: aspect-square size-8 rounded-md border-[1.5px] border-gray-500 p-1 text-gray-500 opacity-100 shadow-md transition-[opacity_scale] duration-75 enabled:active:scale-110 disabled:opacity-50 ease-linear"
			disabled={disabled}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<IconComponent className="size-full" />
		</button>
	);
};

export default Button;
