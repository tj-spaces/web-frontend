/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {ISpaceParticipant} from '../../typings/Space';
import BaseVideo from '../base/BaseVideo';

export default function Participant({
	participant,
	photoUrl,
	videoTrack,
}: {
	participant: ISpaceParticipant;
	photoUrl?: string;
	videoTrack?: MediaStreamTrack;
}) {
	const initials = participant.displayName
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return videoTrack ? (
		<BaseVideo track={videoTrack} />
	) : photoUrl ? (
		<img src={photoUrl} alt={participant.displayName} />
	) : (
		<h1>{initials}</h1>
	);
}
