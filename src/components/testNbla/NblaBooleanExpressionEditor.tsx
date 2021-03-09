/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
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
