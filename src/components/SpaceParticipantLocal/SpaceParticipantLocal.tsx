import React, { useContext, useEffect } from 'react';
import { LocalParticipant, VideoTrackPublication } from 'twilio-video';
import usePublications from '../../hooks/usePublications';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import ParticipantBubble from '../ParticipantBubble/ParticipantBubble';
import SpaceAudioContext from '../SpaceAudioContext/SpaceAudioContext';

/**
 * A /local/ Spaces participant. Updates the AudioContext listener position when it moves.
 * @param twilioParticipant The twilio-video library participant (includes MediaStreamTracks)
 * @param spacesParticipant The Spaces participant (includes location, displayName, etc)
 */
export default function SpaceParticipantLocal({
	twilioParticipant,
	spacesParticipant
}: {
	twilioParticipant: LocalParticipant;
	spacesParticipant: ISpaceParticipant;
}) {
	const { listener } = useContext(SpaceAudioContext);
	const {
		position: { location, rotation }
	} = spacesParticipant;

	const publications = usePublications(twilioParticipant);
	const videoTrackPublications = publications.filter(
		(publication) => publication.kind === 'video'
	) as VideoTrackPublication[];

	useEffect(() => {
		listener.positionX.value = location.x;
		listener.positionZ.value = location.y;

		listener.forwardZ.value = Math.sin(rotation);
		listener.forwardX.value = Math.cos(rotation);
	}, [listener, location, rotation]);

	return (
		<ParticipantBubble
			offsetX="50%"
			offsetY="50%"
			name={spacesParticipant.displayName}
			videoTrackPublication={videoTrackPublications[0]}
		/>
	);
}
