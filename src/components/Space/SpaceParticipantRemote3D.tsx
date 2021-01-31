import * as twilio from 'twilio-video';
import usePublications from '../../hooks/usePublications';
import useTrack from '../../hooks/useTrack';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import SpaceParticipantBubble from './SpaceParticipantBubble';
import SpatialAudioTrack from './SpatialAudioTrack';

export default function SpaceParticipantRemote3D({
	twilioParticipant,
	spacesParticipant
}: {
	twilioParticipant: twilio.Participant | null;
	spacesParticipant: ISpaceParticipant;
}) {
	const publications = usePublications(twilioParticipant);
	const { position } = spacesParticipant;

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
				<SpatialAudioTrack position={position} publication={publication} />
			))}
			<SpaceParticipantBubble participant={spacesParticipant} videoTrack={videoTrack} />
		</>
	);
}
