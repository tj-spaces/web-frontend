import { ISpace } from '../../typings/Space';
import { Link } from 'react-router-dom';
import { createStylesheet } from '../../styles/createStylesheet';
import hoverableLightBox from '../../styles/hoverableLightBox';
import spacing from '../../styles/spacing';

const styles = createStylesheet({
	spaceOnlineCount: {
		fontSize: '0.75rem',
		textTransform: 'uppercase',
		color: 'var(--spaces-color-light-1)'
	},
	spaceListItem: {
		extends: [hoverableLightBox.hoverableLightBox, spacing.columnItem],
		height: '5em',
		fontSize: '1.25em'
	}
});

export default function SpaceListItem({ clusterId, space }: { clusterId: string; space: ISpace }) {
	console.log(spacing);
	return (
		<div className={styles.spaceListItem}>
			<b>
				<Link to={`/clusters/${clusterId}/spaces/${space.id}`} className="unstyled-link">
					{space.name}
				</Link>
			</b>
			<br />
			<b className={styles.spaceOnlineCount}>Online: {space.online_count}</b>
		</div>
	);
}
