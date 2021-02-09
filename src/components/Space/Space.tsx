import {useCallback, useEffect, useState} from 'react';
import * as io from 'socket.io-client';
import {connect, Room} from 'twilio-video';
import useSocketEventListener from '../../hooks/useSocketEventListener';
import {getLogger} from '../../lib/ClusterLogger';
import {API_SERVER_URL} from '../../lib/constants';
import getSessionId from '../../lib/getSessionId';
import SpaceConnectionContext from './SpaceConnectionContext';
import SpaceContainer from './SpaceContainer';
import SpaceIDContext from './SpaceIDContext';
import SpaceMediaWrapper from './SpaceMediaWrapper';
import SpaceParticipantsContext from './SpaceParticipantsContext';
import SpaceMessagesContext from './SpaceQuestionsContext';
import useSpaceMessages from './useSpaceMessages';
import useSpaceParticipants from './useSpaceParticipants';

const logger = getLogger('space');
const conn = io.connect(API_SERVER_URL + '?sessionID=' + getSessionId());

export default function Space({id}: {id: string}) {
	const [twilioRoom, setTwilioRoom] = useState<Room | null>(null);

	const onReceiveTwilioGrant = useCallback((grant: string) => {
		logger.debug('Received Twilio grant');
		connect(grant, {region: 'us1'})
			.then((room) => {
				setTwilioRoom(room);
			})
			.catch((err) => {
				logger.error('Error when receiving Twilio grant: ' + err);
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

	const messages = useSpaceMessages(conn);
	const participants = useSpaceParticipants(conn);

	return (
		<SpaceIDContext.Provider value={id}>
			<SpaceConnectionContext.Provider value={conn}>
				<SpaceParticipantsContext.Provider value={participants}>
					<SpaceMessagesContext.Provider value={messages}>
						<SpaceMediaWrapper twilioRoom={twilioRoom}>
							<SpaceContainer />
						</SpaceMediaWrapper>
					</SpaceMessagesContext.Provider>
				</SpaceParticipantsContext.Provider>
			</SpaceConnectionContext.Provider>
		</SpaceIDContext.Provider>
	);
}
