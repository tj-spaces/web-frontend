import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
import './Button.sass';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
	type?: 'small' | 'large';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { type = 'small' } = props;
	return <button ref={ref} className={'button button-' + type} {...props} />;
});

export default Button;
