import {NbExpression} from './ASTTypes';
import NblaBinaryExpressionEditor from './NblaBinaryExpressionEditor';
import NblaIdentifierEditor from './NblaIdentifierEditor';
import NblaIntExpressionEditor from './NblaIntExpressionEditor';
import NblaSetExpressionEditor from './NblaSetExpressionEditor';

export default function NblaExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbExpression;
	setExpression: (newValue: NbExpression) => void;
}) {
	switch (expression.type) {
		case 'binary':
			return (
				<NblaBinaryExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
		case 'int':
			return (
				<NblaIntExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
		case 'identifier':
			return (
				<NblaIdentifierEditor
					id={expression.id}
					setID={(id) => setExpression({type: 'identifier', id})}
				/>
			);
		case 'set':
			return (
				<NblaSetExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
	}
	return <span>{JSON.stringify(expression)}</span>;
}
