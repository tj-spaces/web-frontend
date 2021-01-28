import { SpacePositionInfo } from '../typings/SpaceParticipant';

export default function getCSSTransform(from: SpacePositionInfo, to: SpacePositionInfo) {
	// For now, assumes a constant Y value
	let toXRelative = to.location.x - from.location.x;
	let toZRelative = to.location.z - from.location.z;
	let magnitudeRelative = Math.sqrt(toXRelative ** 2 + toZRelative ** 2);

	let gazeX = Math.cos(from.rotation);
	let gazeZ = Math.sin(from.rotation);

	// use dot product
	// A dot B = cos(theta)|A||B|
	// because the gaze vector is from sin/cos it has magnitude=1
	let angleBetweenCos = (gazeX * toXRelative + gazeZ * toZRelative) / magnitudeRelative;
	let angleBetweenSin = Math.sqrt(1 - angleBetweenCos ** 2);

	if (angleBetweenCos < 0) {
		// This should be hidden!!!
	}

	let rotatedRelativeZ = magnitudeRelative * angleBetweenCos;
	let rotatedRelativeX = magnitudeRelative * angleBetweenSin;

	console.log({ toXRelative, toZRelative, gazeX, gazeZ });

	return `perspective(1rem) translate3d(${rotatedRelativeX / 2}rem, 0, ${-rotatedRelativeZ / 2 - 1}rem)`;
}
