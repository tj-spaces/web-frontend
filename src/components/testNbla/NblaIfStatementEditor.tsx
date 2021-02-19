import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbIfStatement} from './ASTTypes';

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
		</BaseRow>
	);
}
