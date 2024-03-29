/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbBinaryExpression} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaBinaryExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbBinaryExpression;
	setExpression: (expr: NbBinaryExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Binary Expression</BaseText>
			<BaseRow direction="row" spacing={1}>
				<NblaExpressionEditor
					expression={expression.left}
					setExpression={(expr) => setExpression({...expression, left: expr})}
				/>

				<select
					value={expression.operator}
					onChange={(evt) =>
						// @ts-expect-error
						setExpression({...expression, operator: evt.target.value})
					}
				>
					<option value="+">+</option>
					<option value="-">-</option>
					<option value="*">*</option>
					<option value="/">/</option>
				</select>

				<NblaExpressionEditor
					expression={expression.right}
					setExpression={(expr) => setExpression({...expression, right: expr})}
				/>
			</BaseRow>
		</BaseRow>
	);
}
