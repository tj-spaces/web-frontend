import React, { useContext } from 'react';
import SpaceMediaContext from './SpaceMediaContext';
import { VideoTrack } from 'twilio-video';
import { spaceViewStyles } from './SpaceViewStyles';
import SpaceParticipant from './SpaceParticipant';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';

/**
 * A /local/ Spaces participant. Updates the AudioContext listener position when it moves.
 * @param twilioParticipant The twilio-video library participant (includes MediaStreamTracks)
 * @param spacesParticipant The Spaces participant (includes location, displayName, etc)
 */
export default function SpaceBottomLocalVideo({ participant }: { participant: ISpaceParticipant }) {
	const mediaContext = useContext(SpaceMediaContext);
	const localVideoTrack = mediaContext?.localVideoTrack ?? null;

	return (
		<div className={spaceViewStyles.bottomLocalVideo}>
			<SpaceParticipant participant={participant} videoTrack={localVideoTrack as VideoTrack} />
		</div>
	);
}
