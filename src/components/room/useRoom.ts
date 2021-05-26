import * as immutable from 'immutable';
import {useEffect, useState} from 'react';

type RoomProps = {
	id: string;
	connectionState: 'connecting' | 'connected' | 'disconnected';
	participants: immutable.Map<string, any>;
};

class Room extends immutable.Record<RoomProps>({
	id: '',
	connectionState: 'connecting',
	participants: immutable.Map(),
}) {}

export default function useRoom(id: string): Room {
	const [room, setRoom] = useState(new Room());

	useEffect(() => {
		setRoom(new Room({id}));
	}, [id]);

	return room;
}
