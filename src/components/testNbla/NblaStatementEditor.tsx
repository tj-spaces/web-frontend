/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import {NbStatement} from './ASTTypes';
import {defaultStatements} from './DefaultValues';
import NblaAmbientStatementEditor from './NblaAmbientStatementEditor';
import NblaAsyncStatementEditor from './NblaAsyncStatementEditor';
import NblaExpressionEditor from './NblaExpressionEditor';
import NblaForOfStatementEditor from './NblaForOfStatementEditor';
import NblaFunctionEditor from './NblaFunctionEditor';
import NblaHookStatementEditor from './NblaHookEditor';
import NblaIfStatementEditor from './NblaIfStatementEditor';
import NblaReturnStatementEditor from './NblaReturnStatementEditor';

export default function NblaStatementEditor({
	statement,
	setStatement,
}: {
	statement: NbStatement;
	setStatement: (value: NbStatement) => void;
}) {
	let component: JSX.Element = <span>{JSON.stringify(statement)}</span>;
	switch (statement.type) {
		case 'ambient':
			component = (
				<NblaAmbientStatementEditor
					statement={statement}
					setStatement={setStatement}
				/>
			);
			break;
		case 'expression':
			component = (
				<NblaExpressionEditor
					expression={statement.expression}
					setExpression={(expression) =>
						setStatement({...statement, expression})
					}
				/>
			);
			break;
		case 'fn':
			component = <NblaFunctionEditor fn={statement} setFn={setStatement} />;
			break;
		case 'hook':
			component = (
				<NblaHookStatementEditor
					statement={statement}
					setStatement={setStatement}
				/>
			);
			break;
		case 'if':
			component = (
				<NblaIfStatementEditor
					statement={statement}
					setStatement={setStatement}
				/>
			);
			break;
		case 'return':
			component = (
				<NblaReturnStatementEditor
					statement={statement}
					setStatement={setStatement}
				/>
			);
			break;
		case 'forof':
			component = (
				<NblaForOfStatementEditor
					statement={statement}
					setStatement={setStatement}
				/>
			);
			break;
		case 'async':
			component = (
				<NblaAsyncStatementEditor
					statement={statement}
					setStatement={setStatement}
				/>
			);
			break;
	}

	return (
		<BaseRow direction="column">
			<select
				value={statement.type}
				// @ts-expect-error
				onChange={(evt) => setStatement(defaultStatements[evt.target.value])}
			>
				{Object.keys(defaultStatements).map((name) => (
					<option key={name}>{name}</option>
				))}
			</select>
			{component}
		</BaseRow>
	);
}
