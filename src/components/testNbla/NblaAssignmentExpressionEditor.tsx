import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbAssignmentExpression} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';
import NblaIdentifierEditor from './NblaIdentifierEditor';
import NblaMemberExpressionEditor from './NblaMemberExpressionEditor';

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
				{expression.left.type === 'identifier' ? (
					<NblaIdentifierEditor
						expression={expression.left}
						setExpression={(left) => setExpression({...expression, left})}
					></NblaIdentifierEditor>
				) : (
					<NblaMemberExpressionEditor
						expression={expression.left}
						setExpression={(left) => setExpression({...expression, left})}
					/>
				)}
				{' = '}
				<NblaExpressionEditor
					expression={expression.right}
					setExpression={(right) => setExpression({...expression, right})}
				/>
			</BaseRow>
		</BaseRow>
	);
}
