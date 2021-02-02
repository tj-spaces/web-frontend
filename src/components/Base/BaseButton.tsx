import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import boxShadow from '../../styles/boxShadow';
import colors from '../../styles/colors';
import { createStylesheet } from '../../styles/createStylesheet';

const styles = createStylesheet({
	button: {
		extends: [boxShadow.boxShadow],

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
	| {
			to: string;
			style?: CSSProperties;
			className?: string;
	  }
) & {
	size?: keyof typeof sizeStyles;
	variant?: keyof typeof variantStyles;
};

const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { size = 'medium', variant = 'primary' } = props;
	if ('to' in props) {
		const { to, className } = props;
		return (
			<Link to={to} className={[styles.button, sizeStyles[size], variantStyles[variant], className].join(' ')}>
				{props.children}
			</Link>
		);
	} else {
		const { className, ...otherProps } = props;
		return (
			<button
				ref={ref}
				className={[styles.button, sizeStyles[size], variantStyles[variant], className].join(' ')}
				{...otherProps}
			/>
		);
	}
});

export default BaseButton;
