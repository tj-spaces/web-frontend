import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbIfStatement} from './ASTTypes';
import NblaBlockEditor from './NblaBlockEditor';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaIfStatementEditor({
	statement,
	setStatement,
}: {
	statement: NbIfStatement;
	setStatement: (value: NbIfStatement) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Comparison</BaseText>
			<NblaExpressionEditor
				expression={statement.condition}
				setExpression={(condition) => setStatement({...statement, condition})}
			/>
			<NblaBlockEditor
				block={statement.consequent}
				setBlock={(consequent) => setStatement({...statement, consequent})}
			/>
		</BaseRow>
	);
}
