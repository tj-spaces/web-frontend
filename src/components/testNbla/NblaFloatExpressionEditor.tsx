import React from 'react';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbFloatExpression} from './ASTTypes';

export default function NblaFloatExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbFloatExpression;
	setExpression: (expr: NbFloatExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Float</BaseText>
			<input
				type="number"
				step="any"
				onChange={(evt) =>
					setExpression({type: 'float', value: parseFloat(evt.target.value)})
				}
				value={expression.value}
			/>
		</BaseRow>
	);
}
