/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext, useEffect, useMemo} from 'react';
import {useThree} from 'react-three-fiber';
import * as THREE from 'three';
import {Position} from '../../typings/Space';
import PointOfViewContext from './PointOfViewContext';
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
	const {camera} = useThree();
	const video = useMemo(() => document.createElement('video'), []);
	const videoTracks = useTracks(`user$${id}:user`, 'video');
	const hasVideoTracks = videoTracks.length > 0;
	const pov = useContext(PointOfViewContext);
	const sdk = useVoiceSDK();

	useEffect(() => {
		if (!me) {
			sdk.associateStreamWithDownstream(`user$${id}:user`, 'localhost');
			sdk.subscribe(`user$${id}:user`, {audio: true, video: true});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Camera positioning
	useEffect(() => {
		if (me) {
			if (pov === 'third-person') {
				let offset = {
					x: Math.sin(rotation),
					z: Math.cos(rotation),
				};
				camera.position.set(
					position.x + offset.x * 2,
					position.y + 4,
					position.z + offset.z * 6
				);
				camera.rotation.set(-Math.PI / 8, rotation, 0);
			} else {
				camera.position.set(position.x, position.y + 2, position.z);
			}
		}
	}, [camera, camera.position, me, position, pov, rotation]);

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

				const videoPlaying =
					video.currentTime > 0 &&
					!video.paused &&
					!video.ended &&
					video.readyState > video.HAVE_CURRENT_DATA;

				// if (videoPlaying) {
				// 	video.pause();
				// }

				// video.srcObject = obj;

				console.log(
					'removed tracks from srcObject. currently:',
					(video.srcObject as MediaStream).getTracks()
				);

				// video.play();
			}
		}
	}, [video, videoTracks]);

	return (
		<mesh
			position={[position.x, position.y + 2, position.z]}
			// Vertical rotations must be made along the Z axis, because we rotate by pi/2 on the X axis.
			rotation={[0, 0, rotation ?? 0]}
		>
			{/* <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.125, 64]} /> */}
			<planeBufferGeometry attach="geometry" args={[1, 1]} />
			{
				// Don't display my own avatar if in first person
				!(me && pov === 'first-person') &&
					(console.log('not me, hasvideotracks is', hasVideoTracks),
					(
						<meshBasicMaterial
							attach="material"
							color={!hasVideoTracks ? (me ? '#ff6666' : '#66ff66') : '#ffffff'}
							side={THREE.DoubleSide}
							flatShading
						>
							{hasVideoTracks &&
								(function () {
									if (video.srcObject) {
										console.log(
											'videotracks:',
											(video.srcObject as MediaStream).getTracks()
										);
									}

									return (
										<videoTexture
											attach="map"
											args={[video]}
											wrapS={THREE.RepeatWrapping}
											wrapT={THREE.RepeatWrapping}
										/>
									);
								})()}
						</meshBasicMaterial>
					))
			}
		</mesh>
	);
}
