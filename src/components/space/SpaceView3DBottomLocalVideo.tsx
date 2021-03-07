import React, {useContext} from 'react';
import {VideoTrack} from 'twilio-video';
import {SpaceParticipant} from '../../typings/Space';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceParticipantBackground from './SpaceParticipant';
import SpaceParticipantCircle from './SpaceParticipantCircle';
import {spaceViewStyles} from './SpaceViewStyles';

/**
 * A /local/ Spaces participant. Updates the AudioContext listener position when it moves.
 * @param twilioParticipant The twilio-video library participant (includes MediaStreamTracks)
 * @param spacesParticipant The Spaces participant (includes location, displayName, etc)
 */
export default function SpaceBottomLocalVideo({
	participant,
}: {
	participant: SpaceParticipant;
}) {
	const mediaContext = useContext(SpaceMediaContext);
	const localVideoTrack = mediaContext?.localVideoTrack ?? null;

	return (
		<div className={spaceViewStyles('bottomLocalVideo')}>
			<SpaceParticipantCircle isLocal>
				<SpaceParticipantBackground
					participant={participant}
					videoTrack={localVideoTrack as VideoTrack}
				/>
			</SpaceParticipantCircle>
		</div>
	);
}
