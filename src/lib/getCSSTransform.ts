import {CSSProperties} from 'react';
import {Position} from '../typings/Space';

const FOV = (Math.PI * 5) / 6;

/**
 * Returns the CSS transform needed to render an item in 3D space from a given perspective
 */
export default function getCSSTransform(
	from: Position,
	from_rotation: number,
	to: Position
): CSSProperties {
	// For now, assumes a constant Y value
	let xRelative = to.x - from.x;
	let zRelative = to.z - from.z;

	// We rotate to find out where the relative value is, with a ~rotation matrix~
	let cos = Math.cos(from_rotation);
	let sin = Math.sin(from_rotation);

	let xRelativeRotated = cos * xRelative - sin * zRelative;
	let zRelativeRotated = sin * xRelative + cos * zRelative;

	let horizontalAngleToObject =
		Math.atan2(zRelativeRotated, xRelativeRotated) - Math.PI / 2;
	// This ranges from -1 to 1 and needs to be mapped to 100% --> 0%
	// Add one, divide by 2, multiply by 100, subtract from 100.
	let projectedLocationX = horizontalAngleToObject / (FOV / 2);
	let projectedLocationXPercent = (1 - (projectedLocationX + 1) / 2) * 100;

	let distance = Math.sqrt(xRelative ** 2 + zRelative ** 2);
	// If it's out of view...
	if (zRelativeRotated < 0) {
		return {
			// transform: `scale(100)`,
			transformOrigin: 'center',
			position: 'absolute',
			left: `${projectedLocationXPercent}%`,
			opacity: 0,
		};
	}
	if (distance < 0.01 || distance > 10000 || zRelativeRotated < 0) {
		return {
			display: 'none',
		};
	}

	let scale = 1 / distance;

	return {
		transform: `scale(${scale})`,
		transformOrigin: 'center',
		position: 'absolute',
		left: `${projectedLocationXPercent}%`,
	};
}
