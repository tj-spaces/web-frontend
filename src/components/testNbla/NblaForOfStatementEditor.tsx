import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbForOfStatement} from './ASTTypes';
import NblaBindingEditor from './NblaBindingEditor';
import NblaBlockEditor from './NblaBlockEditor';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaForOfStatementEditor({
	statement,
	setStatement,
}: {
	statement: NbForOfStatement;
	setStatement: (value: NbForOfStatement) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">For-Of Statement</BaseText>

			<BaseText variant="caption">For each item of...</BaseText>
			<NblaExpressionEditor
				expression={statement.of}
				setExpression={(of) => setStatement({...statement, of})}
			/>

			<BaseText variant="caption">as...</BaseText>
			<NblaBindingEditor
				binding={statement.as}
				setBinding={(as) => setStatement({...statement, as})}
			/>

			<BaseText variant="caption">do...</BaseText>
			<NblaBlockEditor
				block={statement.body}
				setBlock={(body) => setStatement({...statement, body})}
			/>
		</BaseRow>
	);
}
