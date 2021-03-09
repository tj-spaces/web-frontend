/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbItemExpression} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaItemExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbItemExpression;
	setExpression: (value: NbItemExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Get Item</BaseText>

			<BaseText variant="caption">Base object:</BaseText>
			<NblaExpressionEditor
				expression={expression.of}
				setExpression={(of) => setExpression({...expression, of})}
			/>

			<BaseText variant="caption">Item:</BaseText>
			<NblaExpressionEditor
				expression={expression.item}
				setExpression={(item) => setExpression({...expression, item})}
			/>
		</BaseRow>
	);
}
