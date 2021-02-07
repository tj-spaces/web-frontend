import { useContext, useEffect, useRef, useState } from 'react';
import * as io from 'socket.io-client';
import { API_SERVER_URL } from '../../lib/constants';
import { mutate, Updater } from 'queryshift';
import getSessionId from '../../lib/getSessionId';
import { getLogger } from '../../lib/ClusterLogger';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import SpaceIDContext from './SpaceIDContext';
import SpaceContext from './SpaceContext';
import SpaceConnectionContext from './SpaceConnectionContext';
import { Question } from '../../typings/QuestionAndAnswer';
import SpaceQuestionsContext from './SpaceQuestionsContext';

type ParticipantMap = { [participantId: string]: ISpaceParticipant };

const logger = getLogger('space/connection');

export default function SpaceConnectionWrapper({
	onReceiveTwilioGrant,
	children
}: {
	onReceiveTwilioGrant: (grant: string) => void;
	children: React.ReactNode;
}) {
	const [participants, setParticipants] = useState<ParticipantMap>({});
	const [questions, setQuestions] = useState<Record<string, Question>>({});
	const connectionRef = useRef<SocketIOClient.Socket | null>(null);
	const id = useContext(SpaceIDContext);

	// id
	// this sets up the socket.io connection and twilio grant
	useEffect(() => {
		if (!connectionRef.current) {
			connectionRef.current = io.connect(API_SERVER_URL + '?sessionID=' + getSessionId());
		}

		connectionRef.current.emit('join_space', id);

		connectionRef.current.on('peers', (peers: { [id: string]: ISpaceParticipant }) => {
			logger(`Received peer list: ${Object.keys(peers).length} peers`);
			setParticipants(peers);
		});

		connectionRef.current.on('peer_joined', (peer: ISpaceParticipant) => {
			logger(`Peer joined: ${peer.accountId}`);
			setParticipants((participants) => ({
				...participants,
				[peer.accountId]: peer
			}));
		});

		connectionRef.current.on('peer_left', (peerId: string) => {
			logger(`Peer left: ${peerId}`);
			setParticipants((participants) => {
				let newParticipants = { ...participants };
				delete newParticipants[peerId];
				return newParticipants;
			});
		});

		connectionRef.current.on('peer_update', (peerId: string, updates: Updater<ISpaceParticipant>) => {
			setParticipants((participants) => ({
				...participants,
				[peerId]: mutate(participants[peerId], updates)
			}));
		});

		connectionRef.current.on('question', (questionID: string, senderID: string, text: string) => {
			setQuestions((questions) => ({
				...questions,
				[questionID]: {
					senderID,
					text,
					id: questionID,
					answers: [],
					markedAsAnswered: false
				}
			}));
		});

		connectionRef.current.on('question_answer_added', (questionID: string, senderID: string, text: string) => {
			setQuestions((questions) => ({
				...questions,
				[questionID]: {
					...questions[questionID],
					answers: [
						...questions[questionID].answers,
						{
							senderID,
							text
						}
					]
				}
			}));
		});

		connectionRef.current.on('question_answer_accepted', (questionID: string) => {
			setQuestions((questions) => ({
				...questions,
				[questionID]: {
					...questions[questionID],
					markedAsAnswered: true
				}
			}));
		});

		connectionRef.current.on('question_list', (questions: Question[]) => {
			let questionMap: Record<string, Question> = {};
			for (let question of questions) {
				questionMap[question.id] = question;
			}
			setQuestions(questionMap);
		});

		return () => {
			if (connectionRef.current) {
				connectionRef.current.emit('leave_space');
				connectionRef.current.disconnect();
				connectionRef.current = null;
			}
		};
	}, [id]);

	useEffect(() => {
		if (onReceiveTwilioGrant) {
			if (!connectionRef.current) {
				connectionRef.current = io.connect(API_SERVER_URL + '?sessionId=' + getSessionId());
			}

			connectionRef.current.on('twilio_grant', onReceiveTwilioGrant);

			return () => {
				connectionRef.current?.off('twilio_grant', onReceiveTwilioGrant);
			};
		}
	}, [id, onReceiveTwilioGrant]);

	return (
		<SpaceContext.Provider value={{ participants }}>
			<SpaceQuestionsContext.Provider value={questions}>
				<SpaceConnectionContext.Provider value={connectionRef.current}>
					{children}
				</SpaceConnectionContext.Provider>
			</SpaceQuestionsContext.Provider>
		</SpaceContext.Provider>
	);
}
