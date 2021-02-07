import { useContext } from 'react';
import BaseRow from '../../Base/BaseRow';
import SpaceQuestionsContext from '../SpaceQuestionsContext';

export default function QuestionList() {
	const questions = useContext(SpaceQuestionsContext);
	return (
		<BaseRow direction="column">
			{Object.values(questions).map((q) => {
				return (
					<BaseRow direction="row" key={q.id}>
						{q.text}
					</BaseRow>
				);
			})}
		</BaseRow>
	);
}
