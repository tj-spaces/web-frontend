import React, { useCallback, useState } from 'react';
import { connect, Room } from 'twilio-video';
import { getLogger } from '../../lib/ClusterLogger';
import SpaceIDContext from './SpaceIDContext';
import SpaceConnectionWrapper from './SpaceConnectionWrapper';
import SpaceFrame from './SpaceFrame';
import SpaceMediaWrapper from './SpaceMediaWrapper';

const logger = getLogger('space');

export default function Space({ id }: { id: string }) {
	const [twilioRoom, setTwilioRoom] = useState<Room | null>(null);

	const onReceiveTwilioGrant = useCallback(
		(grant: string) => {
			if (twilioRoom) {
				logger('Warn: Received Twilio room grant when Twilio Room already existed', 'warn');
			} else {
				connect(grant, { region: 'us1' }).then((room) => {
					setTwilioRoom(room);
				});
			}
		},
		[twilioRoom]
	);

	return (
		<SpaceIDContext.Provider value={id}>
			<SpaceConnectionWrapper onReceiveTwilioGrant={onReceiveTwilioGrant}>
				<SpaceMediaWrapper twilioRoom={twilioRoom}>
					<SpaceFrame />
				</SpaceMediaWrapper>
			</SpaceConnectionWrapper>
		</SpaceIDContext.Provider>
	);
}
