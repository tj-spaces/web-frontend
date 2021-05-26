import {useContext, useDebugValue} from 'react';
import {RoomContext} from './RoomProvider';

export function useRoomConnectionState() {
	const {connectionState} = useContext(RoomContext).room;

	useDebugValue(connectionState);

	return connectionState;
}

export function useRoomSDK() {
	const {roomSDK} = useContext(RoomContext);

	useDebugValue(roomSDK);

	return roomSDK;
}

export function useRoomParticipants() {
	const {participants} = useContext(RoomContext).room;

	useDebugValue(participants.toJS());

	return participants;
}

export function useRoomID() {
	const {id} = useContext(RoomContext).room;

	useDebugValue(id);

	return id;
}
