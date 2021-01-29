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
		alignItems: 'center'
	},
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
	variant?: 'small' | 'medium' | 'large';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { variant = 'medium' } = props;
	if ('to' in props) {
		const { to, className } = props;
		return (
			<Link to={to} className={[styles.button, styles[variant], className].join(' ')}>
				{props.children}
			</Link>
		);
	} else {
		const { className, ...otherProps } = props;
		return (
			<button
				ref={ref}
				className={'button button-' + variant + (className ? ' ' + className : '')}
				{...otherProps}
			/>
		);
	}
});

export default Button;
