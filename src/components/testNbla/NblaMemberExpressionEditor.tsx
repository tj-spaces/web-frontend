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
				id={expression.property}
				setID={(id) => setExpression({...expression, property: id})}
			/>
		</BaseRow>
	);
}
