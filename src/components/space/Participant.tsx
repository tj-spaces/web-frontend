import React from 'react';
import {SpaceParticipant} from '../../typings/Space';
import BaseVideo from '../base/BaseVideo';

export default function Participant({
	participant,
	photoUrl,
	videoTrack,
}: {
	participant: SpaceParticipant;
	photoUrl?: string;
	videoTrack?: MediaStreamTrack;
}) {
	const initials = participant.display_name
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return videoTrack ? (
		<BaseVideo track={videoTrack} />
	) : photoUrl ? (
		<img src={photoUrl} alt={participant.display_name} />
	) : (
		<h1>{initials}</h1>
	);
}
