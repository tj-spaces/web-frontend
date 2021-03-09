/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbTypeBinding} from './ASTTypes';

export default function NblaBindingEditor({
	binding,
	setBinding,
}: {
	binding: NbTypeBinding;
	setBinding: (value: NbTypeBinding) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Variable</BaseText>
			<input
				type="text"
				onChange={(evt) => setBinding({...binding, label: evt.target.value})}
				value={binding.label}
			/>
		</BaseRow>
	);
}
