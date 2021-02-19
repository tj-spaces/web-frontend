import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbCallExpression} from './ASTTypes';
import NblaExpressionEditor from './NblaExpressionEditor';

export default function NblaCallExpressionEditor({
	expression,
	setExpression,
}: {
	expression: NbCallExpression;
	setExpression: (value: NbCallExpression) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Function Call</BaseText>
			<BaseRow direction="column">
				<BaseText variant="caption">Callee</BaseText>
				<NblaExpressionEditor
					expression={expression.callee}
					setExpression={(expr) => setExpression({...expression, callee: expr})}
				/>
			</BaseRow>
			<BaseRow direction="column">
				<BaseText variant="caption">Arguments</BaseText>
				{expression.parameters.map((param, index) => {
					return (
						<>
							<NblaExpressionEditor
								expression={param}
								key={index}
								setExpression={(expr) =>
									setExpression({
										...expression,
										parameters: [
											...expression.parameters.slice(0, index),
											expr,
											...expression.parameters.slice(index + 1),
										],
									})
								}
							/>
							<button
								onClick={() =>
									setExpression({
										...expression,
										parameters: [
											...expression.parameters.slice(0, index),
											...expression.parameters.slice(index + 1),
										],
									})
								}
							>
								Delete
							</button>
						</>
					);
				})}
				<button
					onClick={() => {
						setExpression({
							...expression,
							parameters: [
								...expression.parameters,
								{
									type: 'string',
									value: 'Argument #' + expression.parameters.length,
								},
							],
						});
					}}
				>
					Add argument
				</button>
			</BaseRow>
		</BaseRow>
	);
}
