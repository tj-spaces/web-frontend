import { useEffect, useState } from 'react';
import * as twilio from 'twilio-video';

export default function useTracks(participant: twilio.Participant) {
	const [audioTrack, setAudioTrack] = useState<MediaStreamTrack>();
	const [videoTrack, setVideoTrack] = useState<MediaStreamTrack>();

	useEffect(() => {
		if (participant) {
			let audioTracks = Array.from(participant.audioTracks.values());
			let videoTracks = Array.from(participant.videoTracks.values());

			for (let audioTrack of audioTracks) {
				if (audioTrack.track) {
					let { mediaStreamTrack } = audioTrack.track;
					setAudioTrack(mediaStreamTrack);
					break;
				}
			}

			for (let videoTrack of videoTracks) {
				if (videoTrack.track) {
					let { mediaStreamTrack } = videoTrack.track;
					setVideoTrack(mediaStreamTrack);
					break;
				}
			}
		}
	}, [participant]);

	return { audioTrack, videoTrack };
}
