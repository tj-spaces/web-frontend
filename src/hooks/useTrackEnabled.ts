import { useState } from 'react';
import * as twilio from 'twilio-video';

export default function useTrackEnabled(track: twilio.Track) {
	const [enabled, setEnabled] = useState(true);

	track.on('disabled', () => {
		setEnabled(false);
	});

	return enabled;
}
