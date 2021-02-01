import { useContext } from 'react';
import useLocalParticipant from '../../hooks/useLocalParticipant';
import { getLogger } from '../../lib/ClusterLogger';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceParticipantCircle from './SpaceParticipantCircle';

const logger = getLogger('space/2d/local-participant');

export default function SpaceView2DLocalParticipant() {
	const mediaContext = useContext(SpaceMediaContext);
	const videoTrack = mediaContext?.localVideoTrack;
	const localParticipant = useLocalParticipant();

	if (localParticipant == null) {
		logger('Local participant is NULL', 'error');
		return null;
	}

	return <SpaceParticipantCircle participant={localParticipant} videoTrack={videoTrack} isLocal={true} />;
}
