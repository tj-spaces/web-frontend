import { useState } from 'react';
import useSocketEventListener from '../../hooks/useSocketEventListener';
import { Question } from '../../typings/QuestionAndAnswer';

export default function useSpaceQuestions(conn: SocketIOClient.Socket) {
	const [questions, setQuestions] = useState<Record<string, Question>>({});

	useSocketEventListener(conn, 'question', (questionID: string, senderID: string, text: string) => {
		setQuestions((questions) => ({
			...questions,
			[questionID]: { senderID, text, id: questionID, answers: [], markedAsAnswered: false }
		}));
	});

	useSocketEventListener(conn, 'question_answer_added', (questionID: string, senderID: string, text: string) => {
		setQuestions((questions) => ({
			...questions,
			[questionID]: {
				...questions[questionID],
				answers: [...questions[questionID].answers, { senderID, text }]
			}
		}));
	});

	useSocketEventListener(conn, 'question_answer_accepted', (questionID: string) => {
		setQuestions((questions) => ({
			...questions,
			[questionID]: {
				...questions[questionID],
				markedAsAnswered: true
			}
		}));
	});

	useSocketEventListener(conn, 'question_list', (questions: Question[]) => {
		let questionMap: Record<string, Question> = {};
		for (let question of questions) {
			questionMap[question.id] = question;
		}
		setQuestions(questionMap);
	});

	return questions;
}
