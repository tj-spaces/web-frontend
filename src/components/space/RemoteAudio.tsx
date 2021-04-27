/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import SpatialAudioTrack from '../../media/SpatialAudioTrack';
import {Position} from '../../typings/Space';
import {useTracks} from './VoiceHooks';

export default function RemoteAudio({
	userID,
	position,
}: {
	userID: string;
	position: Position;
}) {
	const tracks = useTracks(userID, 'audio');

	if (!tracks) {
		return null;
	}

	return (
		<>
			{tracks.map((track) => (
				<SpatialAudioTrack
					position={position}
					rotation={0}
					track={track}
					key={track.trackID}
				/>
			))}
		</>
	);
}
