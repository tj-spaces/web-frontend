import {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	ForwardedRef,
	forwardRef,
} from 'react';
import {Link} from 'react-router-dom';
import boxShadow from '../../styles/boxShadow';
import colors from '../../styles/colors';
import {
	stylex,
	ClassProvider as CompiledClasses,
	createStylesheet,
} from '../../styles/createStylesheet';

const styles = createStylesheet({
	button: {
		border: '0px',
		padding: '0.25em',
		color: 'var(--white)',
		transition: 'box-shadow 0.5s ease',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
	},
});

const sizeStyles = createStylesheet({
	small: {
		padding: '0.5em',
		fontSize: '1.25rem',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		borderRadius: '0.5em',
	},
	medium: {
		padding: '0.25em',
		fontSize: '1.5rem',
		borderRadius: '0.5em',
	},
	large: {
		padding: '0.75em',
		fontSize: '2rem',
		borderRadius: '0.5em',
	},
});

const variantStyles = createStylesheet({
	primary: {
		backgroundColor: 'var(--bg-primary)',
		color: 'var(--text-primary)',
	},
	positive: {
		backgroundColor: 'var(--text-primary)',
		color: 'var(--bg-primary)',
	},
	negative: {
		backgroundColor: 'var(--text-warn)',
	},
	theme: {
		backgroundColor: colors.red,
	},
});

type ButtonProps = (
	| /* Button */
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
	/* Link styled like a button */
	| {to: string; children: React.ReactNode}
) & {
	size?: keyof typeof sizeStyles;
	variant?: keyof typeof variantStyles;
	boxShadow?: boolean;
	xstyle?: CompiledClasses;
};

const BaseButton = (
	{
		size = 'small',
		variant = 'primary',
		boxShadow: useBoxShadow = false,
		xstyle,
		...props
	}: ButtonProps,
	ref: ForwardedRef<HTMLButtonElement>
) => {
	if ('to' in props) {
		const {to} = props;
		return (
			<Link
				to={to}
				className={stylex(
					styles.button,
					sizeStyles[size],
					variantStyles[variant],
					useBoxShadow && boxShadow.boxShadow,
					xstyle
				)}
			>
				{props.children}
			</Link>
		);
	} else {
		return (
			<button
				ref={ref}
				className={stylex(
					styles.button,
					sizeStyles[size],
					variantStyles[variant],
					useBoxShadow && boxShadow.boxShadow,
					xstyle
				)}
				{...props}
				onClick={(ev) => {
					ev.stopPropagation();
					props.onClick?.(ev);
				}}
			/>
		);
	}
};

export default forwardRef<HTMLButtonElement, ButtonProps>(BaseButton);
