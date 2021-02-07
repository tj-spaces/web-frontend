import { createContext } from 'react';
import { Question } from '../../typings/QuestionAndAnswer';

const SpaceQuestionsContext = createContext<Record<string, Question>>({});

export default SpaceQuestionsContext;
