import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbFunctionStatement} from './ASTTypes';
import NblaBlockEditor from './NblaBlockEditor';

export default function NblaFunctionEditor({
	fn,
	setFn,
	deleteFn,
}: {
	fn: NbFunctionStatement;
	setFn: (newValue: NbFunctionStatement) => void;
	deleteFn: () => void;
}) {
	return (
		<BaseRow direction="column" spacing={1}>
			<BaseText variant="list-item-title">{fn.id}</BaseText>
			<button onClick={deleteFn}>Delete</button>
			<NblaBlockEditor
				block={fn.body}
				setBlock={(block) => setFn({...fn, body: block})}
			/>
		</BaseRow>
	);
}
