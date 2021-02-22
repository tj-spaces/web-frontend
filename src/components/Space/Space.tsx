import React, {useEffect, useRef, useState} from 'react';
import {connect, Room} from 'twilio-video';
import joinSpace from '../../space/joinSpace';

import SpaceContainer from './SpaceContainer';
import SpaceIDContext from './SpaceIDContext';
import SpaceManager from './SpaceManager';
import SpaceManagerContext from './SpaceManagerContext';
import SpaceMediaWrapper from './SpaceMediaWrapper';

export default function Space({id}: {id: string}) {
	const [twilioRoom, setTwilioRoom] = useState<Room | null>(null);
	const connectionRef = useRef<WebSocket>();
	const [manager, setManager] = useState<SpaceManager | null>(null);

	useEffect(() => {
		(async () => {
			const {connection, twilioGrant} = await joinSpace(id);
			connectionRef.current = connection;
			setManager(new SpaceManager(connection));

			const room = await connect(twilioGrant, {region: 'us1'});
			setTwilioRoom(room);
		})();
	}, [id]);

	/*
	useLayoutEffect(() => {
		const canvas = canvasRef.current!;
		renderRef.current = new PixelSpaceRenderer(
			canvas.getContext('2d')!,
			managerRef.current
		);
	}, []);
	*/

	return (
		<SpaceIDContext.Provider value={id}>
			<SpaceManagerContext.Provider value={manager}>
				<SpaceMediaWrapper twilioRoom={twilioRoom}>
					<SpaceContainer />
				</SpaceMediaWrapper>
			</SpaceManagerContext.Provider>
		</SpaceIDContext.Provider>
	);
}
