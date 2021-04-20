/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import SpatialAudioTrack from '../../media/SpatialAudioTrack';
import {Position} from '../../typings/Space';
import {useUserStreams} from './VoiceHooks';

export default function RemoteAudio({
	userID,
	position,
}: {
	userID: string;
	position: Position;
}) {
	const streams = useUserStreams(userID);

	if (!streams) {
		return null;
	}

	return (
		<>
			{streams.map((stream) =>
				stream
					.getAudioTracks()
					.map((track) => (
						<SpatialAudioTrack
							position={position}
							rotation={0}
							track={track}
							key={track.id}
						/>
					))
			)}
		</>
	);
}
