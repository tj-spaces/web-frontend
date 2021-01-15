import './Button.css';

export default function Button({
	children,
	...props
}: { children: React.ReactNode } & React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) {
	return (
		<button className={'button' + props.className ? ' ' + props.className : ''} {...props}>
			{children}
		</button>
	);
}
