import React, { useContext, useEffect } from 'react';
import { ISpaceParticipant } from '../../../typings/SpaceParticipant';
import ParticipantBubble from '../ParticipantBubble/ParticipantBubble';
import SpaceAudioContext from '../SpaceAudioContext/SpaceAudioContext';
import SpaceMediaContext from '../SpaceMediaContext';

/**
 * A /local/ Spaces participant. Updates the AudioContext listener position when it moves.
 * @param twilioParticipant The twilio-video library participant (includes MediaStreamTracks)
 * @param spacesParticipant The Spaces participant (includes location, displayName, etc)
 */
export default function SpaceParticipantLocal({ spacesParticipant }: { spacesParticipant: ISpaceParticipant }) {
	const { listener } = useContext(SpaceAudioContext);
	const {
		position: { location, rotation }
	} = spacesParticipant;

	const mediaContext = useContext(SpaceMediaContext);
	const localVideoTrack = mediaContext?.localVideoTrack ?? null;

	useEffect(() => {
		listener.positionX.value = location.x;
		listener.positionZ.value = location.y;

		listener.forwardZ.value = Math.sin(rotation);
		listener.forwardX.value = Math.cos(rotation);
	}, [listener, location, rotation]);

	return <ParticipantBubble participant={spacesParticipant} videoTrack={localVideoTrack} isLocal={true} />;
}
