import { useEffect, useState } from 'react';
import * as twilio from 'twilio-video';

export default function useTracks(participant: twilio.Participant) {
	const [audioTrack, setAudioTrack] = useState<twilio.AudioTrackPublication>();
	const [videoTrack, setVideoTrack] = useState<twilio.VideoTrackPublication>();

	useEffect(() => {
		if (participant) {
			let audioTracks = Array.from(participant.audioTracks.values());
			let videoTracks = Array.from(participant.videoTracks.values());

			for (let audioTrack of audioTracks) {
				if (audioTrack.track) {
					setAudioTrack(audioTrack);
					break;
				}
			}

			for (let videoTrack of videoTracks) {
				if (videoTrack.track) {
					setVideoTrack(videoTrack);
					break;
				}
			}
		}
	}, [participant]);

	return { audioTrack, videoTrack };
}
