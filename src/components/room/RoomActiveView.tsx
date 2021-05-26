import RoomControl from './RoomControl';
import RoomPresence from './RoomPresence';
import {useRoomID, useRoomParticipants, useRoomSDK} from './useRoom';

export default function RoomActiveView() {
	const id = useRoomID();
	const participants = useRoomParticipants();
	const roomSDK = useRoomSDK();
	return (
		<>
			<h1>Room {id}</h1>
			<RoomControl leaveRoom={() => roomSDK.leave()} />
			{participants.map((participant) => (
				<RoomPresence key={participant.id} username={participant.id} />
			))}
		</>
	);
}
