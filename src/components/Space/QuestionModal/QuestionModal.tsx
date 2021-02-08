import {useCallback, useContext, useRef} from 'react';
import {createStylesheet} from '../../../styles/createStylesheet';
import BaseButton from '../../base/BaseButton';
import BaseModal from '../../base/BaseModal';
import BaseRow from '../../base/BaseRow';
import BaseText from '../../base/BaseText';
import SpaceConnectionContext from '../SpaceConnectionContext';
import QuestionList from './QuestionList';

const styles = createStylesheet({
	bottomSection: {
		height: '2rem',
		position: 'absolute',
		left: '0px',
		right: '0px',
		bottom: '0px',
	},
	questionAskBox: {
		width: '100%',
		fontSize: '1.5rem',
	},
	questionsContainer: {
		position: 'relative',
		minHeight: '16rem',
		maxHeight: '30rem',
	},
});

export default function QuestionsModal({onClose}: {onClose: () => void}) {
	const conn = useContext(SpaceConnectionContext);
	const questionTextRef = useRef<HTMLInputElement>(null);

	const onClickedAskQuestion = useCallback(() => {
		if (conn && questionTextRef.current?.value) {
			conn.emit('question', questionTextRef.current?.value);
			questionTextRef.current.value = '';
		}
	}, [conn]);

	return (
		<BaseModal onClickOutside={onClose}>
			<BaseRow direction="column" xstyle={styles.questionsContainer}>
				<BaseText variant="secondary-title">Questions</BaseText>

				<QuestionList />

				<BaseRow
					direction="row"
					alignment="center"
					spacing={1}
					xstyle={styles.bottomSection}
				>
					<input
						type="text"
						ref={questionTextRef}
						className={styles('questionAskBox')}
					/>

					<BaseButton variant="positive" onClick={() => onClickedAskQuestion()}>
						Ask
					</BaseButton>
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
