import * as twilio from 'twilio-video';
import usePublications from '../../hooks/usePublications';
import useTrack from '../../hooks/useTrack';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import ParticipantBubble from '../ParticipantBubble/ParticipantBubble';
import SpatialAudioTrack from '../SpatialAudioTrack/SpatialAudioTrack';

export default function SpaceParticipantRemote({
	twilioParticipant,
	spacesParticipant
}: {
	twilioParticipant: twilio.Participant;
	spacesParticipant: ISpaceParticipant;
}) {
	const publications = usePublications(twilioParticipant);
	const {
		position: { location, rotation }
	} = spacesParticipant;

	const audioTrackPublications = publications.filter(
		(publication) => publication.kind === 'audio'
	) as twilio.AudioTrackPublication[];

	const videoTrackPublications = publications.filter(
		(publication) => publication.kind === 'video'
	) as twilio.VideoTrackPublication[];

	const videoTrack = useTrack(videoTrackPublications[0]) as twilio.VideoTrack;

	return (
		<>
			{audioTrackPublications.map((publication) => (
				<SpatialAudioTrack location={location} rotation={rotation} publication={publication} />
			))}
			<ParticipantBubble
				offsetX={location.x + '%'}
				offsetY={location.y + '%'}
				name={spacesParticipant.displayName}
				videoTrack={videoTrack}
			/>
		</>
	);
}
