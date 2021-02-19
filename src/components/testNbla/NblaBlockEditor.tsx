import React, {useCallback} from 'react';
import {createStylesheet} from '../../styles/createStylesheet';
import BaseRow from '../base/BaseRow';
import {NbBlock, NbStatement} from './ASTTypes';
import {defaultStatements} from './DefaultValues';
import NblaBindingEditor from './NblaBindingEditor';
import NblaStatementEditor from './NblaStatementEditor';

const styles = createStylesheet({
	block: {
		paddingLeft: '0.5em',
		borderLeft: '2px solid white',
	},
});

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
			{block.bindings.map((binding, index) => {
				return (
					<>
						<NblaBindingEditor
							binding={binding}
							setBinding={(binding) =>
								setBlock({
									...block,
									bindings: [
										...block.bindings.slice(0, index),
										binding,
										...block.bindings.slice(index + 1),
									],
								})
							}
						/>
						<button
							onClick={() =>
								setBlock({
									...block,
									bindings: [
										...block.bindings.slice(0, index),
										...block.bindings.slice(index + 1),
									],
								})
							}
						>
							Delete variable
						</button>
					</>
				);
			})}
			{block.body.map((statement, index) => {
				return (
					<BaseRow direction="row" spacing={1}>
						<div>
							<button
								onClick={() => deleteStatementAtIndex(index)}
								style={{marginTop: '1em'}}
							>
								Delete
							</button>
						</div>

						<NblaStatementEditor
							statement={statement}
							setStatement={(statement) =>
								replaceStatementAtIndex(statement, index)
							}
						/>
					</BaseRow>
				);
			})}
			<BaseRow direction="row" spacing={1}>
				<button
					onClick={() =>
						insertStatementAtIndex(
							defaultStatements.expression,
							block.body.length
						)
					}
				>
					Add Expression
				</button>
				<button
					onClick={() => {
						insertStatementAtIndex(defaultStatements.if, block.body.length);
					}}
				>
					Add Statement
				</button>
				<button
					onClick={() => {
						setBlock({
							...block,
							bindings: [
								...block.bindings,
								{
									type: 'string',
									id: '__binding_' + block.bindings.length,
									parameters: [],
									label: 'My variable',
								},
							],
						});
					}}
				>
					Add Variable
				</button>
			</BaseRow>
		</BaseRow>
	);
}
