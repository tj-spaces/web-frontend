/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import {NbExpression} from './ASTTypes';
import {defaultExpressions} from './DefaultValues';
import NblaAssignmentExpressionEditor from './NblaAssignmentExpressionEditor';
import NblaBinaryExpressionEditor from './NblaBinaryExpressionEditor';
import NblaBooleanExpressionEditor from './NblaBooleanExpressionEditor';
import NblaCallExpressionEditor from './NblaCallExpressionEditor';
import NblaFloatExpressionEditor from './NblaFloatExpressionEditor';
import NblaHookExpressionEditor from './NblaHookExpressionEditor';
import NblaIdentifierEditor from './NblaIdentifierEditor';
import NblaIntExpressionEditor from './NblaIntExpressionEditor';
import NblaItemExpressionEditor from './NblaItemExpressionEditor';
import NblaMemberExpressionEditor from './NblaMemberExpressionEditor';
import NblaStringExpressionEditor from './NblaStringExpressionEditor';

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
		case 'hook':
			component = (
				<NblaHookExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
		case 'float':
			component = (
				<NblaFloatExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
			break;
		case 'item':
			component = (
				<NblaItemExpressionEditor
					expression={expression}
					setExpression={setExpression}
				/>
			);
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
