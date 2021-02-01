import { useContext, useEffect, useRef } from 'react';
import { AudioTrack, AudioTrackPublication } from 'twilio-video';
import useMediaStreamTrack from '../../hooks/useMediaStreamTrack';
import useTrack from '../../hooks/useTrack';
import { defaultPannerNodeSettings } from '../../lib/defaultPannerNodeSettings';
import { SpacePositionInfo } from '../../typings/SpaceParticipant';
import SpaceAudioContext from '../Space/SpaceAudioContext';

export default function SpatialAudioTrack({
	position,
	publication
}: {
	position: SpacePositionInfo;
	publication: AudioTrackPublication;
}) {
	const audioTrack = useTrack(publication) as AudioTrack;
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

	// [location, rotation]
	useEffect(() => {
		if (pannerNode.current) {
			pannerNode.current.positionX.value = position.location.x;
			pannerNode.current.positionY.value = position.location.y;

			pannerNode.current.orientationX.value = Math.sin(position.rotation);
			pannerNode.current.orientationZ.value = Math.cos(position.rotation);
		}
	}, [position]);

	return null;
}
