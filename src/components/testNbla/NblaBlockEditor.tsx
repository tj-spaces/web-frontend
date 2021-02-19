import React, {useCallback} from 'react';
import {createStylesheet} from '../../styles/createStylesheet';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {
	NbBlock,
	NbExpressionStatement,
	NbHookStatement,
	NbStatement,
} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';
import NblaHookEditor from './NblaHookEditor';

const styles = createStylesheet({
	block: {
		marginLeft: '0.5em',
		borderLeft: '2px solid white',
	},
});

const baseBinaryExpressionStatement: NbExpressionStatement = {
	type: 'expression',
	expression: {
		type: 'binary',
		left: {
			type: 'int',
			value: 1,
		},
		right: {
			type: 'int',
			value: 1,
		},
		operator: '+',
	},
};

const baseSetExpressionStatement: NbExpressionStatement = {
	type: 'expression',
	expression: {
		type: 'set',
		left: {
			type: 'identifier',
			id: 'id_0',
		},
		right: {
			type: 'int',
			value: 0,
		},
	},
};

const baseHook: NbHookStatement = {
	type: 'hook',
	to: {
		type: 'identifier',
		id: 'hook_expression',
	},
	body: {body: [], bindings: []},
};

export default function NblaBlockEditor({
	block,
	setBlock,
}: {
	block: NbBlock;
	setBlock: (newValue: NbBlock) => void;
}) {
	const replaceStatementAtIndex = useCallback(
		(statement: NbStatement, index: number) => {
			setBlock({
				...block,
				body: [
					...block.body.slice(0, index),
					statement,
					...block.body.slice(index + 1),
				],
			});
		},
		[block, setBlock]
	);

	const insertStatementAtIndex = useCallback(
		(statement: NbStatement, index: number) => {
			setBlock({
				...block,
				body: [
					...block.body.slice(0, index),
					statement,
					...block.body.slice(index),
				],
			});
		},
		[block, setBlock]
	);

	const deleteStatementAtIndex = useCallback(
		(index: number) => {
			setBlock({
				...block,
				body: [...block.body.slice(0, index), ...block.body.slice(index + 1)],
			});
		},
		[block, setBlock]
	);

	return (
		<BaseRow direction="column" spacing={1} xstyle={styles.block}>
			{block.body.map((statement, index) => {
				if (statement.type === 'hook') {
					return (
						<NblaHookEditor
							hook={statement}
							setHook={(hook) => replaceStatementAtIndex(hook, index)}
							deleteHook={() => deleteStatementAtIndex(index)}
						/>
					);
				} else if (statement.type === 'expression') {
					return (
						<BaseRow direction="column">
							<NblaExpressionEditor
								expression={statement.expression}
								setExpression={(expression) =>
									replaceStatementAtIndex(
										{type: 'expression', expression},
										index
									)
								}
							/>
							<button onClick={() => deleteStatementAtIndex(index)}>
								Delete
							</button>
						</BaseRow>
					);
				}
				return null;
			})}
			<BaseRow direction="row" spacing={1}>
				<button
					onClick={() => insertStatementAtIndex(baseHook, block.body.length)}
				>
					Add hook
				</button>
				<button
					onClick={() =>
						insertStatementAtIndex(
							baseBinaryExpressionStatement,
							block.body.length
						)
					}
				>
					Add binary expression
				</button>
				<button
					onClick={() =>
						insertStatementAtIndex(
							baseSetExpressionStatement,
							block.body.length
						)
					}
				>
					Set variable
				</button>
			</BaseRow>
		</BaseRow>
	);
}
