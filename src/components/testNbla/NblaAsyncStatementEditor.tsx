import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbAsyncStatement} from './ASTTypes';
import NblaBlockEditor from './NblaBlockEditor';

export default function NblaAsyncStatementEditor({
	statement,
	setStatement,
}: {
	statement: NbAsyncStatement;
	setStatement: (value: NbAsyncStatement) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Async</BaseText>

			<NblaBlockEditor
				block={statement.body}
				setBlock={(body) => setStatement({...statement, body})}
			/>
		</BaseRow>
	);
}
