import React, {useContext} from 'react';
import {useTracks} from '../../mediautil/MediaConnector';
import SpatialAudioTrack from '../../mediautil/SpatialAudioTrack';
import {Position} from '../../typings/Space';
import SpaceVoiceContext from './VoiceContext';

export default function SpaceRemoteAudio({
	userID,
	position,
}: {
	userID: string;
	position: Position;
}) {
	const voice = useContext(SpaceVoiceContext);
	const tracks = useTracks(voice, userID);
	return (
		<>
			{tracks?.map((track) => (
				<SpatialAudioTrack
					position={position}
					rotation={0}
					track={track}
					key={track.id}
				/>
			))}
		</>
	);
}
