import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as io from 'socket.io-client';
import { connect, Room } from 'twilio-video';
import useSocketEventListener from '../../hooks/useSocketEventListener';
import { getLogger } from '../../lib/ClusterLogger';
import { API_SERVER_URL } from '../../lib/constants';
import getSessionId from '../../lib/getSessionId';
import SpaceContainer from './SpaceContainer';
import SpaceIDContext from './SpaceIDContext';
import SpaceMediaWrapper from './SpaceMediaWrapper';
import SpaceParticipantsContext from './SpaceParticipantsContext';
import SpaceQuestionsContext from './SpaceQuestionsContext';
import useSpaceParticipants from './useSpaceParticipants';
import useSpaceQuestions from './useSpaceQuestions';

const logger = getLogger('space');
const conn = io.connect(API_SERVER_URL + '?sessionID=' + getSessionId());

export default function Space({ id }: { id: string }) {
	const [twilioRoom, setTwilioRoom] = useState<Room | null>(null);

	const onReceiveTwilioGrant = useCallback((grant: string) => {
		console.log('Received Twilio grant');
		connect(grant, { region: 'us1' }).then((room) => {
			setTwilioRoom(room);
		});
	}, []);

	useSocketEventListener(conn, 'twilio_grant', onReceiveTwilioGrant);

	useEffect(() => {
		conn.emit('join_space', id);

		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			conn.emit('leave_space');
		};
	}, [id]);

	const questions = useSpaceQuestions(conn);
	const participants = useSpaceParticipants(conn);

	return (
		<SpaceIDContext.Provider value={id}>
			<SpaceParticipantsContext.Provider value={participants}>
				<SpaceQuestionsContext.Provider value={questions}>
					<SpaceMediaWrapper twilioRoom={twilioRoom}>
						<SpaceContainer />
					</SpaceMediaWrapper>
				</SpaceQuestionsContext.Provider>
			</SpaceParticipantsContext.Provider>
		</SpaceIDContext.Provider>
	);
}
