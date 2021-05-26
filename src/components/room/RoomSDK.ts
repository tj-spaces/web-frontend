import * as immutable from 'immutable';
import {Dispatch, SetStateAction} from 'react';
import io from './io';

type RoomProps = {
	id: string;
	connectionState: 'connecting' | 'connected' | 'disconnected' | 'failed';
	participants: immutable.Map<string, any>;
};

export class Room extends immutable.Record<RoomProps>({
	id: '',
	connectionState: 'connecting',
	participants: immutable.Map(),
}) {}

export class RoomSDK {
	private _room = new Room();

	constructor(private setRoom: Dispatch<SetStateAction<Room>>) {}

	private set room(room: Room) {
		this._room = room;
		this.setRoom(room);
	}

	private get room() {
		return this._room;
	}

	setID(id: string) {
		this.setRoom((room) => room.set('id', id));
	}

	setConnectionState(state: RoomProps['connectionState']) {
		this.setRoom((room) => room.set('connectionState', state));
	}

	addParticipant(id: string, participant: any) {
		this.setRoom((room) =>
			room.set('participants', room.participants.set(id, participant))
		);
	}

	removeParticipant(id: string) {
		this.setRoom((room) =>
			room.set('participants', room.participants.delete(id))
		);
	}

	leave() {
		io.emit('leave-room');
		this.setRoom((room) => room.set('connectionState', 'disconnected'));
	}

	join(id: string) {
		io.emit('join-room', id);
		this.setRoom(() => new Room({id}));
	}
}
