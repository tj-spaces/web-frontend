import {NbExpression} from './ASTTypes';
import NblaBinaryExpressionEditor from './NblaBinaryExpressionEditor';
import NblaIdentifierEditor from './NblaIdentifierEditor';
import NblaIntExpressionEditor from './NblaIntExpressionEditor';
import NblaAssignmentExpressionEditor from './NblaAssignmentExpressionEditor';
import React from 'react';
import NblaBooleanExpressionEditor from './NblaBooleanExpressionEditor';
import NblaCallExpressionEditor from './NblaCallExpressionEditor';
import NblaStringExpressionEditor from './NblaStringExpressionEditor';
import NblaMemberExpressionEditor from './NblaMemberExpressionEditor';
import {defaultExpressions} from './DefaultValues';
import BaseRow from '../base/BaseRow';

export default function NblaExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbExpression;
	setExpression: (newValue: NbExpression) => void;
}) {
	let component: JSX.Element = <span>{JSON.stringify(expression)}</span>;
	switch (expression.type) {
		case 'binary':
			component = (
				<NblaBinaryExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
		case 'int':
			component = (
				<NblaIntExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
		case 'boolean':
			component = (
				<NblaBooleanExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
		case 'string':
			component = (
				<NblaStringExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
		case 'identifier':
			component = (
				<NblaIdentifierEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
		case 'assignment':
			component = (
				<NblaAssignmentExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
		case 'call':
			component = (
				<NblaCallExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
		case 'member':
			component = (
				<NblaMemberExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
	}

	return (
		<BaseRow direction="column">
			<select
				value={expression.type}
				// @ts-expect-error
				onChange={(evt) => setExpression(defaultExpressions[evt.target.value])}
			>
				{Object.keys(defaultExpressions).map((name) => (
					<option key={name}>{name}</option>
				))}
			</select>
			{component}
		</BaseRow>
	);
}
