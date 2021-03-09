/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbStringExpression} from './ASTTypes';

export default function NblaStringExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbStringExpression;
	setExpression: (expr: NbStringExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">String</BaseText>
			<input
				type="string"
				onChange={(evt) =>
					setExpression({type: 'string', value: evt.target.value})
				}
				value={expression.value}
			/>
		</BaseRow>
	);
}
