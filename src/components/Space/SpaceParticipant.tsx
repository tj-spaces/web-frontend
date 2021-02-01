import React from 'react';
import { VideoTrack } from 'twilio-video';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import TwilioVideoElement from '../TwilioVideoElement';

export default function SpaceParticipant({
	participant,
	photoUrl,
	videoTrack
}: {
	participant: ISpaceParticipant;
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
