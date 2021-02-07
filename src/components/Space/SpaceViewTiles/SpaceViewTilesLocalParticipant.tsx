import { useContext } from 'react';
import useLocalParticipant from '../../../hooks/useLocalParticipant';
import { getLogger } from '../../../lib/ClusterLogger';
import SpaceMediaContext from '../SpaceMediaContext';
import SpaceParticipantBackground from '../SpaceParticipant';
import SpaceParticipantTile from '../SpaceParticipantTile';

const logger = getLogger('space/2d/local-participant');

export default function SpaceViewTilesLocalParticipant() {
	const mediaContext = useContext(SpaceMediaContext);
	const videoTrack = mediaContext?.localVideoTrack;
	const localParticipant = useLocalParticipant();

	if (localParticipant == null) {
		logger('Local participant is NULL', 'error');
		return null;
	}

	return (
		<SpaceParticipantTile isLocal>
			<SpaceParticipantBackground participant={localParticipant} videoTrack={videoTrack} />
		</SpaceParticipantTile>
	);
}
