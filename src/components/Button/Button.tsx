import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
import './Button.sass';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	return <button ref={ref} className="button" {...props} />;
});

export default Button;
