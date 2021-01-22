import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './Button.sass';

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
