/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useEffect, useMemo} from 'react';
import * as THREE from 'three';
import {Position} from '../../typings/Space';
import AirwaveLoggerGlobal from './airwave/AirwaveLogger';
import {useTracks, useVoiceSDK} from './VoiceHooks';

export default function UserModel({
	position,
	rotation = 0,
	me,
	id,
}: {
	position: Position;
	rotation: number;
	me: boolean;
	id: string;
}) {
	const video = useMemo(() => document.createElement('video'), []);
	const videoTracks = useTracks(`user$${id}:user`, 'video');
	const hasVideoTracks = videoTracks.length > 0;
	const sdk = useVoiceSDK();

	useEffect(() => {
		if (!me) {
			sdk.associateStreamWithDownstream(`user$${id}:user`, 'localhost');
			sdk.subscribe(`user$${id}:user`, {audio: true, video: true});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Video element
	useEffect(() => {
		if (videoTracks.length > 0) {
			if (!video.srcObject) {
				const videoPlaying =
					video.currentTime > 0 &&
					!video.paused &&
					!video.ended &&
					video.readyState > video.HAVE_CURRENT_DATA;

				const stream = new MediaStream(
					videoTracks.map((track) => track.webrtcTrack)
				);

				if (videoPlaying) {
					video.pause();
				}

				// videoElement.muted = false;
				video.srcObject = stream;

				video
					.play()
					.then(() => {
						console.log('Playing video');
					})
					.catch((error) => {
						console.error('Error playing video:', error);
					});
			} else {
				let obj = video.srcObject as MediaStream;
				// Clear the current tracks
				obj.getTracks().forEach((track) => {
					obj.removeTrack(track);
				});

				// Only add one track
				obj.addTrack(videoTracks[0].webrtcTrack);

				AirwaveLoggerGlobal.debug(
					`updated srcObject; currently: ${(video.srcObject as MediaStream).getTracks()}`
				);
			}
		}
	}, [video, videoTracks]);

	return (
		<>
			<mesh
				position={[position.x, position.y + 2, position.z]}
				// Vertical rotations must be made along the Z axis, because we rotate by pi/2 on the X axis.
				rotation={[0, 0, rotation ?? 0]}
			>
				<planeBufferGeometry attach="geometry" args={[1, 1]} />
				{
					<meshBasicMaterial
						attach="material"
						color={!hasVideoTracks ? (me ? '#ff6666' : '#66ff66') : '#ffffff'}
						side={THREE.DoubleSide}
						flatShading
					>
						{hasVideoTracks && (
							<videoTexture
								attach="map"
								args={[video]}
								wrapS={THREE.RepeatWrapping}
								wrapT={THREE.RepeatWrapping}
							/>
						)}
					</meshBasicMaterial>
				}
			</mesh>
		</>
	);
}
