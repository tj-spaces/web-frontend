import {useContext} from 'react';
import BaseRow from '../../base/BaseRow';
import SpaceQuestionsContext from '../SpaceQuestionsContext';

export default function QuestionList() {
	const questions = useContext(SpaceQuestionsContext);
	return (
		<BaseRow direction="column">
			{Object.values(questions).map((question) => (
				<BaseRow direction="row" key={question.id}>
					{question.text}
				</BaseRow>
			))}
		</BaseRow>
	);
}
