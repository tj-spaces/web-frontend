import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import boxShadow from '../../styles/boxShadow';
import colors from '../../styles/colors';
import { stylex, ClassProvider as CompiledClasses, createStylesheet } from '../../styles/createStylesheet';

const styles = createStylesheet({
	button: {
		// extends: [boxShadow.boxShadow],

		border: '0px',
		padding: '0.25em',
		color: 'var(--spaces-color-light-0)',
		transition: 'box-shadow 0.5s ease',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer'
	}
});

const sizeStyles = createStylesheet({
	small: {
		padding: '0.5em',
		fontSize: '1.25rem',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		borderRadius: '0.5em'
	},
	medium: {
		padding: '0.5em',
		fontSize: '1.5rem',
		borderRadius: '0.5em'
	},
	large: {
		padding: '0.75em',
		fontSize: '2rem',
		borderRadius: '0.5em'
	}
});

const variantStyles = createStylesheet({
	primary: {
		backgroundColor: 'var(--spaces-color-dark-0)'
	},
	positive: {
		backgroundColor: 'var(--spaces-color-positive)'
	},
	negative: {
		backgroundColor: 'var(--spaces-color-negative)'
	},
	theme: {
		backgroundColor: colors.red
	}
});

type ButtonProps = (
	| /* Button */
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
	/* Link styled like a button */
	| { to: string }
) & {
	size?: keyof typeof sizeStyles;
	variant?: keyof typeof variantStyles;
	boxShadow?: boolean;
	xstyle?: CompiledClasses;
};

const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ size = 'medium', variant = 'primary', boxShadow: useBoxShadow = false, xstyle, ...props }, ref) => {
		if ('to' in props) {
			const { to } = props;
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
	}
);

export default BaseButton;
