import { CSSProperties } from 'react';
import { SpacePositionInfo } from '../typings/SpaceParticipant';

const FOV = (Math.PI * 5) / 6;
const LEFT_ANGLE = FOV / 2;
const RIGHT_ANGLE = -FOV / 2;

/**
 * Returns the CSS transform needed to render an item in 3D space from a given perspective
 */
export default function getCSSTransform(from: SpacePositionInfo, to: SpacePositionInfo): CSSProperties {
	// For now, assumes a constant Y value
	let xRelative = to.location.x - from.location.x;
	let zRelative = to.location.z - from.location.z;

	// We rotate to find out where the relative value is, with a ~rotation matrix~
	let cos = Math.cos(from.rotation);
	let sin = Math.sin(from.rotation);

	let xRelativeRotated = cos * xRelative - sin * zRelative;
	let zRelativeRotated = sin * xRelative + cos * zRelative;

	let distance = Math.sqrt(xRelative ** 2 + zRelative ** 2);

	if (distance < 0.01 || distance > 10000 || zRelativeRotated < 0) {
		return { display: 'none' };
	}

	// Scale at 0 should be infinity
	// Scale at infinity should be 0
	// This looks like an inverse relationship to me

	let scale = 1 / distance;
	let xOffset = xRelativeRotated;
	// The X and Z are flipped intentionally to make "straight ahead" = 0 rad
	let horizontalAngleToObject = Math.atan2(zRelativeRotated, xRelativeRotated) - Math.PI / 2;
	let projectedLocationX = horizontalAngleToObject / (FOV / 2);

	console.log({ xRelativeRotated, zRelativeRotated }, horizontalAngleToObject);

	return {
		transform: `scale(${scale})`,
		transformOrigin: 'center',
		position: 'absolute',
		left: `${projectedLocationX * 100 + 50}%`
	};
}
