import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
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
	type?: 'small' | 'large';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { type = 'small' } = props;
	if ('to' in props) {
		return (
			<Link to={props.to} className={'button button-' + type}>
				{props.children}
			</Link>
		);
	} else {
		return <button ref={ref} className={'button button-' + type} {...props} />;
	}
});

export default Button;
