import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { createStylesheet } from '../../styles/createStylesheet';
import { BorderRadiusBubble } from '../../styles/borderRadius';
import './Button.sass';

const ButtonStyles = createStylesheet({
	button: {
		border: '0px',
		padding: '0.25em',
		backgroundColor: 'var(--spaces-color-dark-3)',
		color: 'var(--spaces-color-light-0)',
		transition: 'box-shadow 0.5s ease',
		display: 'flex',
		alignItems: 'center'
	},
	buttonMedium: {
		padding: '0.5em',
		fontSize: '1.5rem',
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
		const { to, className, style } = props;
		return (
			<Link to={to} className={'button button-' + variant + (className ? ' ' + className : '')} style={style}>
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
