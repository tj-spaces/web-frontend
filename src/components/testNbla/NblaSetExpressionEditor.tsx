import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbSetExpression} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';
import NblaIdentifierEditor from './NblaIdentifierEditor';

export default function NblaSetExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbSetExpression;
	setExpression: (newValue: NbSetExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Assigment</BaseText>
			<BaseRow direction="row" spacing={1}>
				<NblaIdentifierEditor
					id={expression.left.id}
					setID={() =>
						setExpression({
							...expression,
							left: {
								type: 'identifier',
								id: expression.left.id,
							},
						})
					}
				/>
				{' = '}
				<NblaExpressionEditor
					expression={expression.right}
					setExpression={(right) => setExpression({...expression, right})}
				/>
			</BaseRow>
		</BaseRow>
	);
}
