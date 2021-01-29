import { ISpace } from '../../typings/Space';
import { Link } from 'react-router-dom';
import { classes, createStylesheet } from '../../styles/createStylesheet';
import hoverableLightBox from '../../styles/hoverableLightBox';
import spacing from '../../styles/spacing';

const Styles = createStylesheet({
	spaceOnlineCount: {
		fontSize: '0.75rem',
		textTransform: 'uppercase',
		color: 'var(--spaces-color-light-1)'
	}
});

export default function SpaceListItem({ clusterId, space }: { clusterId: string; space: ISpace }) {
	console.log(spacing);
	return (
		<div
			className={classes(hoverableLightBox.hoverableLightBox, spacing.columnItem)}
			style={{ height: '5em', fontSize: '1.25em' }}
		>
			<b>
				<Link to={`/clusters/${clusterId}/spaces/${space.id}`} className="unstyled-link">
					{space.name}
				</Link>
			</b>
			<br />
			<b className={classes(Styles.spaceOnlineCount)}>Online: {space.online_count}</b>
		</div>
	);
}
