import {useContext, useEffect, useRef} from 'react';
// import {defaultPannerNodeSettings} from '../lib/defaultPannerNodeSettings';
import SpaceAudioContext from '../components/space/SpaceAudioContext';
import {Position} from '../typings/Space';

export default function SpatialAudioTrack({
	position,
	rotation,
	track,
}: {
	position: Position;
	rotation: number;
	track: MediaStreamTrack;
}) {
	const audioContext = useContext(SpaceAudioContext);
	const pannerNode = useRef<PannerNode>();

	// [audioContext, audioTrack]
	useEffect(() => {
		if (!audioContext) {
			console.warn('AudioContext is NULL');
			return;
		}

		let stream = new MediaStream([track]);
		let audioSource = audioContext.createMediaStreamSource(stream);
		pannerNode.current = audioContext.createPanner();
		audioSource.connect(pannerNode.current).connect(audioContext.destination);
		console.log({audioSource, audioContext, pannerNode});

		return () => {
			audioSource.disconnect();
			pannerNode.current = undefined;
		};
	}, [audioContext, track]);

	// [location, rotation]
	useEffect(() => {
		if (pannerNode.current) {
			pannerNode.current.positionX.value = position.x;
			pannerNode.current.positionY.value = position.y;

			pannerNode.current.orientationX.value = Math.sin(rotation);
			pannerNode.current.orientationZ.value = Math.cos(rotation);
		}
	}, [position, rotation]);

	return null;
}
