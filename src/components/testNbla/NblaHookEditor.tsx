import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbHookStatement} from './ASTTypes';
import NblaBlockEditor from './NblaBlockEditor';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaHookStatementEditor({
	statement,
	setStatement,
}: {
	statement: NbHookStatement;
	setStatement: (newValue: NbHookStatement) => void;
}) {
	return (
		<BaseRow direction="column" spacing={1}>
			<BaseText variant="caption">Hook</BaseText>
			<NblaExpressionEditor
				expression={statement.to}
				setExpression={(expr) =>
					setStatement({
						...statement,
						to: expr,
					})
				}
			/>
			<BaseText variant="caption">Body</BaseText>
			<NblaBlockEditor
				block={statement.body}
				setBlock={(body) => setStatement({...statement, body})}
			/>
		</BaseRow>
	);
}
