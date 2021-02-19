import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbHookStatement} from './ASTTypes';
import NblaBlockEditor from './NblaBlockEditor';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaHookEditor({
	hook,
	setHook,
	deleteHook,
}: {
	hook: NbHookStatement;
	setHook: (newValue: NbHookStatement) => void;
	deleteHook: () => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText>
				Hooking to:{' '}
				<NblaExpressionEditor
					expression={hook.to}
					setExpression={(expr) =>
						setHook({
							...hook,
							to: expr,
						})
					}
				/>
			</BaseText>
			<button onClick={deleteHook}>Delete</button>
			Body
			<NblaBlockEditor
				block={hook.body}
				setBlock={(body) => setHook({...hook, body})}
			/>
		</BaseRow>
	);
}
