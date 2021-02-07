import * as twilio from 'twilio-video';
import useLocalParticipant from '../../../hooks/useLocalParticipant';
import usePublications from '../../../hooks/usePublications';
import useTrack from '../../../hooks/useTrack';
import { getLogger } from '../../../lib/ClusterLogger';
import getCSSTransform from '../../../lib/getCSSTransform';
import { createStylesheet } from '../../../styles/createStylesheet';
import { SpaceParticipant } from '../../../typings/SpaceParticipant';
import SpaceParticipantCircle from '../SpaceParticipantCircle';
import SpatialAudioTrack from '../../../mediautil/SpatialAudioTrack';
import SpaceParticipantBackground from '../SpaceParticipant';

const logger = getLogger('space/participant-bubble');

const styles = createStylesheet({
	participantRemote3D: {
		top: '50%',
		transition: 'left 0.5s ease, top 0.5s ease, transform 0.5s ease'
	}
});

export default function SpaceParticipantRemote3D({
	twilioParticipant,
	spacesParticipant
}: {
	twilioParticipant: twilio.Participant | null;
	spacesParticipant: SpaceParticipant;
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

	const me = useLocalParticipant();

	if (!me) {
		logger.warn('Local Participant is null');
		return null;
	}

	const spatialCSSTransform = getCSSTransform(me?.position, spacesParticipant.position);

	return (
		<>
			{audioTrackPublications.map((publication) => (
				<SpatialAudioTrack position={position} publication={publication} />
			))}
			<div style={spatialCSSTransform} className={styles('participantRemote3D')}>
				<SpaceParticipantCircle isLocal={false}>
					<SpaceParticipantBackground participant={spacesParticipant} videoTrack={videoTrack} />
				</SpaceParticipantCircle>
			</div>
		</>
	);
}
