/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext} from 'react';
import {useTracks} from '../../media/VoiceServer';
import SpatialAudioTrack from '../../media/SpatialAudioTrack';
import {Position} from '../../typings/Space';
import SpaceVoiceContext from './VoiceContext';

export default function RemoteAudio({
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
			{tracks?.map(
				(track) =>
					track.kind === 'audio' && (
						<SpatialAudioTrack
							position={position}
							rotation={0}
							track={track}
							key={track.id}
						/>
					)
			)}
		</>
	);
}
