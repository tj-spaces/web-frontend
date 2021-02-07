import {useEffect, useState} from 'react';
import {LocalTrackPublication, RemoteTrackPublication} from 'twilio-video';

export default function useTrack(
	publication: LocalTrackPublication | RemoteTrackPublication | undefined
) {
	const [track, setTrack] = useState(publication && publication.track);

	useEffect(() => {
		// Reset the track when the 'publication' variable changes.
		setTrack(publication && publication.track);

		if (publication) {
			const unsetTrack = () => setTrack(null);

			publication.on('subscribed', setTrack);
			publication.on('unsubscribed', unsetTrack);
			return () => {
				publication.off('subscribed', setTrack);
				publication.off('unsubscribed', unsetTrack);
			};
		}
	}, [publication]);

	return track;
}
