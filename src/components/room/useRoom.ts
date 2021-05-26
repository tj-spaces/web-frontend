import {useContext} from 'react';
import {RoomContext} from './RoomProvider';

export function useRoomConnectionState() {
	return useContext(RoomContext).room.connectionState;
}

export function useRoomSDK() {
	return useContext(RoomContext).roomSDK;
}

export function useRoomParticipants() {
	return useContext(RoomContext).room.participants;
}

export function useRoomID() {
	return useContext(RoomContext).room.id;
}
