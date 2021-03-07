import React from 'react';
import {SpaceParticipant} from '../../typings/Space';
import TwilioVideoElement from '../TwilioVideoElement';

export default function SpaceParticipantBackground({
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
		<TwilioVideoElement track={videoTrack} />
	) : photoUrl ? (
		<img src={photoUrl} alt={participant.display_name} />
	) : (
		<h1>{initials}</h1>
	);
}
