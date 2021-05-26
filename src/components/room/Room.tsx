import {createStylesheet} from 'src/styles/createStylesheet';
import {useRoomConnectionState, useRoomSDK} from './useRoom';
import RoomLeftView from './RoomLeftView';
import RoomActiveView from './RoomActiveView';
import {useEffect, useCallback} from 'react';
import {Socket} from 'socket.io-client';
import io from './io';

const styles = createStylesheet({
	room: {
		marginLeft: '2rem',
		marginRight: '2rem',
		minWidth: '20rem',
	},
});

function useSio(io: Socket, evt: string, cb: (...args: any[]) => void) {
	useEffect(() => {
		io.on(evt, cb);
		return () => void io.off(evt, cb);
	}, [io, evt, cb]);
}

export default function Room({id}: {id: string}) {
	const roomSDK = useRoomSDK();

	useEffect(() => {
		roomSDK.join(id);
		return () => {
			roomSDK.leave();
		};
	}, [id, roomSDK]);

	const onJoinedRoom = useCallback(
		(roomID: string) => {
			roomSDK.setConnectionState('connected');
			roomSDK.addParticipant('@me', {id: '@me'});
		},
		[roomSDK]
	);

	useSio(io, 'joined-room', onJoinedRoom);

	const onParticipantJoined = useCallback(
		(participant: any) => {
			roomSDK.addParticipant(participant.id, participant);
		},
		[roomSDK]
	);

	useSio(io, 'participant-joined', onParticipantJoined);

	const onParticipantLeft = useCallback(
		(participantID: string) => {
			console.log('participant left:', participantID);
			roomSDK.removeParticipant(participantID);
		},
		[roomSDK]
	);

	useSio(io, 'participant-left', onParticipantLeft);

	const connectionState = useRoomConnectionState();
	return (
		<div className={styles('room')}>
			{connectionState === 'disconnected' ? (
				<RoomLeftView />
			) : connectionState === 'connecting' ? null : (
				<RoomActiveView />
			)}
		</div>
	);
}
