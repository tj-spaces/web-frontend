import React from 'react';
import * as twilio from 'twilio-video';
import usePublications from '../../../hooks/usePublications';
import useTrack from '../../../hooks/useTrack';
import { ISpaceParticipant } from '../../../typings/SpaceParticipant';
import AudioTrack from '../../../mediautil/AudioTrack';
import SpaceParticipant from '../SpaceParticipant';
import SpaceParticipantTile from '../SpaceParticipantTile';

export default function SpaceViewTilesRemoteParticipant({
	spacesParticipant,
	twilioParticipant
}: {
	spacesParticipant: ISpaceParticipant;
	twilioParticipant: twilio.Participant | null;
}) {
	const publications = usePublications(twilioParticipant);

	const audioTrackPublications = publications.filter(
		(publication) => publication.kind === 'audio'
	) as twilio.AudioTrackPublication[];

	const videoTrackPublications = publications.filter(
		(publication) => publication.kind === 'video'
	) as twilio.VideoTrackPublication[];

	const videoTrack = useTrack(videoTrackPublications[0]) as twilio.VideoTrack;

	return (
		<SpaceParticipantTile isLocal={false}>
			<AudioTrack publication={audioTrackPublications[0]} />
			<SpaceParticipant participant={spacesParticipant} videoTrack={videoTrack} />
		</SpaceParticipantTile>
	);
}
