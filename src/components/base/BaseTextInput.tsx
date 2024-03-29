/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {ForwardedRef, forwardRef} from 'react';
import {createStylesheet} from '../../styles/createStylesheet';
import {FontSize, FontWeight} from '../../styles/font';

interface BaseTextInputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	fontSize?: FontSize;
	fontWeight?: FontWeight;
}

const styles = createStylesheet({
	base: {
		padding: '0.5em',
		borderRadius: '0.5em',
	},
});

function BaseTextInput(
	{fontSize = 'medium', fontWeight = 'normal', ...props}: BaseTextInputProps,
	ref: ForwardedRef<HTMLInputElement>
) {
	return <input {...props} ref={ref} className={styles('base')} />;
}

export default forwardRef<HTMLInputElement, BaseTextInputProps>(BaseTextInput);
