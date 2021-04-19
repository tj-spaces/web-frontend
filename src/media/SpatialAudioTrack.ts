/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext, useEffect, useRef} from 'react';
import SpaceMediaContext from '../components/space/SpaceMediaContext';
import {getLogger} from '../lib/ClusterLogger';
import {defaultPannerNodeSettings} from '../lib/defaultPannerNodeSettings';
import {Position} from '../typings/Space';

const logger = getLogger('space/spatial-audio');

export default function SpatialAudioTrack({
	position,
	rotation,
	track,
}: {
	position: Position;
	rotation: number;
	track: MediaStreamTrack;
}) {
	const {audioContext} = useContext(SpaceMediaContext);
	const pannerNode = useRef<PannerNode>();

	// [audioContext, audioTrack]
	useEffect(() => {
		if (!audioContext) {
			logger.warn({
				event: 'create_panner_node',
				warning: 'AudioContext is null',
			});
			return;
		}

		let audio = new Audio();
		audio.srcObject = new MediaStream([track]);
		audio.muted = true;

		let audioSource = audioContext.createMediaStreamSource(audio.srcObject);
		pannerNode.current = new PannerNode(
			audioContext,
			defaultPannerNodeSettings
		);
		audioSource.connect(pannerNode.current);
		pannerNode.current.connect(audioContext.destination);

		return () => {
			// audio.pause();
			audioSource.disconnect();
			pannerNode.current = undefined;
		};
	}, [audioContext, track]);

	// [location, rotation]
	useEffect(() => {
		if (pannerNode.current) {
			pannerNode.current.positionX.value = position.x;
			pannerNode.current.positionZ.value = position.z;

			pannerNode.current.orientationX.value = Math.sin(rotation);
			pannerNode.current.orientationZ.value = Math.cos(rotation);
		}
	}, [position, rotation]);

	return null;
}
