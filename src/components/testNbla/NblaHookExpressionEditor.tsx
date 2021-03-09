/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbHookExpression} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaHookExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbHookExpression;
	setExpression: (value: NbHookExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Hook</BaseText>
			<NblaExpressionEditor
				expression={expression.to}
				setExpression={(to) => setExpression({...expression, to})}
			/>
		</BaseRow>
	);
}
