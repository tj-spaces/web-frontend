import { ISpace } from '../../typings/Space';
import SpaceFeedItem from './SpaceFeedItem';
import BaseRow from '../../components/Base/BaseRow';
import BaseText from '../../components/Base/BaseText';

export default function SpaceFeed({ spaces }: { spaces: ISpace[] }) {
	return (
		<BaseRow direction="column" spacing={1} rails="auto" width="100%">
			<BaseText variant="heading" fontWeight="bold" fontSize="xl" alignment="center">
				Cluster
			</BaseText>
			{spaces.map((space) => (
				<SpaceFeedItem space={space} key={space.id} />
			))}
		</BaseRow>
	);
}
