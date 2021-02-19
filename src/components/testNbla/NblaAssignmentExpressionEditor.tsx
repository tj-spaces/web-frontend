import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbAssignmentExpression} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';
import NblaIdentifierEditor from './NblaIdentifierEditor';

export default function NblaAssignmentExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbAssignmentExpression;
	setExpression: (newValue: NbAssignmentExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Assigment</BaseText>
			<BaseRow direction="row" spacing={1}>
				<NblaIdentifierEditor
					id={expression.left.id}
					setID={(id) =>
						setExpression({
							...expression,
							left: {type: 'identifier', id},
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
