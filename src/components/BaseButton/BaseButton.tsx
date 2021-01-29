import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { createStylesheet } from '../../styles/createStylesheet';
import { BorderRadiusBubble, BorderRadiusCrisp } from '../../styles/borderRadius';

const styles = createStylesheet({
	button: {
		border: '0px',
		padding: '0.25em',
		backgroundColor: 'var(--spaces-color-dark-3)',
		color: 'var(--spaces-color-light-0)',
		transition: 'box-shadow 0.5s ease',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const sizeStyles = createStylesheet({
	small: {
		padding: '0.5em',
		fontSize: '1.25rem',
		borderRadius: BorderRadiusCrisp
	},
	medium: {
		padding: '0.5em',
		fontSize: '1.5rem',
		borderRadius: BorderRadiusBubble
	},
	large: {
		padding: '0.75em',
		fontSize: '2rem',
		borderRadius: BorderRadiusBubble
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
	size?: 'small' | 'medium' | 'large';
	variant?: 'primary' | 'positive' | 'negative';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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

export default Button;
