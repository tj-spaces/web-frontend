import * as twilio from 'twilio-video';
import usePublications from '../../../hooks/usePublications';
import useTrack from '../../../hooks/useTrack';
import { ISpaceParticipant } from '../../../typings/SpaceParticipant';
import AudioTrack from '../../Media/AudioTrack';
import SpaceParticipantCircle from '../SpaceParticipantCircle';

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
		<>
			<AudioTrack publication={audioTrackPublications[0]} />
			<SpaceParticipantCircle participant={spacesParticipant} videoTrack={videoTrack} isLocal={false} />
		</>
	);
}
