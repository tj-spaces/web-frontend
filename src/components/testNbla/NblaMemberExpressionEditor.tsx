/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbMemberExpression} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';
import NblaIdentifierEditor from './NblaIdentifierEditor';

export default function NblaMemberExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbMemberExpression;
	setExpression: (value: NbMemberExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Member Expression</BaseText>
			<NblaExpressionEditor
				expression={expression.of}
				setExpression={(expr) => setExpression({...expression, of: expr})}
			/>
			<NblaIdentifierEditor
				expression={{type: 'identifier', id: expression.property}}
				setExpression={(newExpression) =>
					setExpression({...expression, property: newExpression.id})
				}
			/>
		</BaseRow>
	);
}
