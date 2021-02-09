import React from 'react';
import {VideoTrack} from 'twilio-video';
import {SpaceParticipant} from '../../typings/Space';
import TwilioVideoElement from '../TwilioVideoElement';

export default function SpaceParticipantBackground({
	participant,
	photoUrl,
	videoTrack,
}: {
	participant: SpaceParticipant;
	photoUrl?: string;
	videoTrack?: VideoTrack | null;
}) {
	const initials = participant.displayName
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return videoTrack ? (
		<TwilioVideoElement track={videoTrack} />
	) : photoUrl ? (
		<img src={photoUrl} alt={participant.displayName} />
	) : (
		<h1>{initials}</h1>
	);
}
