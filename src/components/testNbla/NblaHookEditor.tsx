import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbHookStatement} from './ASTTypes';
import NblaBlockEditor from './NblaBlockEditor';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaHookEditor({
	hook,
	setHook,
}: {
	hook: NbHookStatement;
	setHook: (newValue: NbHookStatement) => void;
}) {
	return (
		<BaseRow direction="column" spacing={1}>
			<BaseText variant="caption">Hook</BaseText>
			<NblaExpressionEditor
				expression={hook.to}
				setExpression={(expr) =>
					setHook({
						...hook,
						to: expr,
					})
				}
			/>
			<BaseText variant="caption">Body</BaseText>
			<NblaBlockEditor
				block={hook.body}
				setBlock={(body) => setHook({...hook, body})}
			/>
		</BaseRow>
	);
}
