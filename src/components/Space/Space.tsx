import {useEffect, useRef, useState} from 'react';
import {connect, Room} from 'twilio-video';
import SpaceIDContext from './SpaceIDContext';
import joinSpace from '../../space/joinSpace';
import SpaceManager from './SpaceManager';

export default function Space({id}: {id: string}) {
	const [twilioRoom, setTwilioRoom] = useState<Room | null>(null);
	const connectionRef = useRef<WebSocket>();
	const managerRef = useRef<SpaceManager>();

	useEffect(() => {
		(async () => {
			const {connection, twilioGrant} = await joinSpace(id);
			connectionRef.current = connection;
			managerRef.current = new SpaceManager(connection);

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

	// const messages = useSpaceMessageSubscription(conn);
	// const participants = useSpaceParticipantsSubscription(conn);

	return (
		<SpaceIDContext.Provider value={id}>
			{/* <SpaceConnectionContext.Provider value={conn}>
				<SpaceParticipantsContext.Provider value={participants}>
					<SpaceMessagesContext.Provider value={messages}>
						<SpaceMediaWrapper twilioRoom={twilioRoom}>
							<SpaceContainer />
						</SpaceMediaWrapper>
					</SpaceMessagesContext.Provider>
				</SpaceParticipantsContext.Provider>
			</SpaceConnectionContext.Provider> */}
		</SpaceIDContext.Provider>
	);
}
