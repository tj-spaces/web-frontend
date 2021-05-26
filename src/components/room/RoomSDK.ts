import * as immutable from 'immutable';
import {Dispatch, SetStateAction} from 'react';

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
	constructor(private setRoom: Dispatch<SetStateAction<Room>>) {}

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
		this.setRoom((room) => room.set('connectionState', 'disconnected'));
	}

	join(id: string) {
		this.setRoom(() => new Room({id}));
		setTimeout(() => {
			this.setRoom((room) => room.set('connectionState', 'connected'));
		}, 5000);
	}
}
