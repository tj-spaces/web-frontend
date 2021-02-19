import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbReturnStatement} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaReturnStatementEditor({
	statement,
	setStatement,
}: {
	statement: NbReturnStatement;
	setStatement: (value: NbReturnStatement) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Return</BaseText>
			<NblaExpressionEditor
				expression={statement.argument}
				setExpression={(argument) => setStatement({...statement, argument})}
			/>
		</BaseRow>
	);
}
