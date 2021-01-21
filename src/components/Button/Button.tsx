import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './Button.sass';

type ButtonProps = (
	| /* Button */
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
	/* Link styled like a button */
	| {
			to: string;
	  }
) & {
	variant?: 'small' | 'medium' | 'large';
	style?: CSSProperties;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { variant = 'medium' } = props;
	if ('to' in props) {
		return (
			<Link to={props.to} className={'button button-' + variant} style={props.style}>
				{props.children}
			</Link>
		);
	} else {
		return <button ref={ref} className={'button button-' + variant} {...props} />;
	}
});

export default Button;
