import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbAmbientStatement} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaAmbientStatementEditor({
	statement,
	setStatement,
}: {
	statement: NbAmbientStatement;
	setStatement: (value: NbAmbientStatement) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Ambient</BaseText>
			<NblaExpressionEditor
				expression={statement.expression}
				setExpression={(expression) => setStatement({...statement, expression})}
			/>
		</BaseRow>
	);
}
