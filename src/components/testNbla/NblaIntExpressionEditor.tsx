import React from 'react';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbIntExpression} from './ASTTypes';

export default function NblaIntExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbIntExpression;
	setExpression: (expr: NbIntExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Integer</BaseText>
			<input
				type="number"
				onChange={(evt) =>
					setExpression({type: 'int', value: parseInt(evt.target.value)})
				}
				value={expression.value}
			/>
		</BaseRow>
	);
}
