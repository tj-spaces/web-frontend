import {createContext, ReactNode, useMemo, useState} from 'react';
import {Room, RoomSDK} from './RoomSDK';

export const RoomContext = createContext({
	room: new Room(),
	roomSDK: new RoomSDK(null!),
});

export default function RoomProvider({children}: {children: ReactNode}) {
	const [room, setRoom] = useState(new Room());
	const roomSDK = useMemo(() => new RoomSDK(setRoom), [setRoom]);

	return (
		<RoomContext.Provider value={{room, roomSDK}}>
			{children}
		</RoomContext.Provider>
	);
}
