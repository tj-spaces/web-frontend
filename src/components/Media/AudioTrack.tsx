import { useContext, useEffect, useRef } from 'react';
import { AudioTrack as TwilioAudioTrack, AudioTrackPublication } from 'twilio-video';
import useMediaStreamTrack from '../../hooks/useMediaStreamTrack';
import useTrack from '../../hooks/useTrack';
import { defaultPannerNodeSettings } from '../../lib/defaultPannerNodeSettings';
import SpaceAudioContext from '../Space/SpaceAudioContext';

export default function AudioTrack({ publication }: { publication?: AudioTrackPublication }) {
	const audioTrack = useTrack(publication) as TwilioAudioTrack;
	const audioContext = useContext(SpaceAudioContext);
	const pannerNode = useRef<PannerNode>();
	const mediaStreamTrack = useMediaStreamTrack(audioTrack);

	// [audioContext, audioTrack]
	useEffect(() => {
		if (mediaStreamTrack) {
			let audioSource = audioContext.createMediaStreamSource(new MediaStream([mediaStreamTrack]));
			pannerNode.current = new PannerNode(audioContext, defaultPannerNodeSettings);
			audioSource.connect(pannerNode.current).connect(audioContext.destination);

			return () => {
				audioSource.disconnect();
				pannerNode.current = undefined;
			};
		}
	}, [audioContext, mediaStreamTrack]);

	return null;
}
