/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useEffect} from 'react';

export default function useSocketEventListener(
	io: SocketIOClient.Socket,
	event: string,
	callback: (...args: any[]) => void
) {
	useEffect(() => {
		io.on(event, callback);
		return () => {
			io.off(event, callback);
		};
	}, [callback, event, io]);
}
