import React from 'react';
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
