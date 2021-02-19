import React from 'react';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbBooleanExpression} from './ASTTypes';

export default function NblaBooleanExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbBooleanExpression;
	setExpression: (expr: NbBooleanExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">True/False</BaseText>
			<select
				value={expression.value ? 'true' : 'false'}
				onChange={(evt) =>
					setExpression({
						type: 'boolean',
						value: evt.target.value === 'true' ? true : false,
					})
				}
			>
				<option value="true">True</option>
				<option value="false">False</option>
			</select>
		</BaseRow>
	);
}
