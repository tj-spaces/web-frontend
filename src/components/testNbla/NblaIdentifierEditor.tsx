/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbIdentifierExpression} from './ASTTypes';

export default function NblaIdentifierEditor({
	expression,
	setExpression,
}: {
	expression: NbIdentifierExpression;
	setExpression: (id: NbIdentifierExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Identifier</BaseText>
			<input
				type="text"
				onChange={(evt) =>
					setExpression({type: 'identifier', id: evt.target.value})
				}
				value={expression.id}
			/>
		</BaseRow>
	);
}
