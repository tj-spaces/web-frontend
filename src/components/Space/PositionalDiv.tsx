import getCSSTransform from '../../lib/getCSSTransform';
import { classes, createStylesheet } from '../../styles/createStylesheet';
import { SpacePositionInfo } from '../../typings/SpaceParticipant';

export type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const styles = createStylesheet({
	positionalDiv: {
		position: 'absolute',
		transition: 'all 500ms ease',
		top: '50%',
		overflowY: 'scroll'
	},
	whiteSquare: {
		width: '100px',
		height: '100px',
		marginLeft: '-50px',
		marginTop: '-50px',
		backgroundColor: 'white',
		color: 'black'
	}
});

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
	const css = perspective ? getCSSTransform(perspective, position) : undefined;
	return (
		<div
			className={classes(styles.positionalDiv, styles.whiteSquare, className)}
			style={{ ...css, ...(style ?? {}) }}
			{...props}
		>
			Hello!
			<br />
			CSS: {JSON.stringify(css)}
			<br />
			Perspective: {JSON.stringify(perspective)}
		</div>
	);
}
