import { joinCluster } from '../../api/api';
import { BorderRadiusBubble } from '../../styles/borderRadius';
import { createStylesheet } from '../../styles/createStylesheet';
import spacing from '../../styles/spacing';
import { ICluster } from '../../typings/Cluster';
import Button from '../Button/Button';

export const styles = createStylesheet({
	clusterPreview: {
		borderRadius: BorderRadiusBubble,
		backgroundColor: 'var(--spaces-color-dark-2)',
		padding: '2em',
		extends: [spacing.columnItem]
	}
});

export default function ClusterPreview({ cluster }: { cluster: ICluster }) {
	const joinThisCluster = () => {
		joinCluster(cluster.id).then(() => {
			window.location.href = '/clusters/' + cluster.id;
		});
	};

	return (
		<div className={styles.clusterPreview}>
			<a href={'/clusters/' + cluster.id}>
				<h1>{cluster.name}</h1>
			</a>

			<Button className="button button-small background-color-green" onClick={() => joinThisCluster()}>
				JOIN
			</Button>
		</div>
	);
}
