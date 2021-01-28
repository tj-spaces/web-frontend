import getCSSTransform from '../../lib/getCSSTransform';
import { SpacePositionInfo } from '../../typings/SpaceParticipant';
import './PositionalDiv.sass';

export type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function PositionalDiv({
	perspective,
	position,
	style,
	className,
	...props
}: {
	perspective: SpacePositionInfo;
	position: SpacePositionInfo;
} & DivProps) {
	const transform = perspective ? getCSSTransform(perspective, position) : undefined;
	const customClassName = 'positional-div' + (className ? ' ' + className : '');
	return (
		<div className={customClassName} style={{ transform, ...(style ?? {}) }} {...props}>
			Hello!
		</div>
	);
}
