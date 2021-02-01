import { ISpace } from '../../typings/Space';
import SpaceFeedItem from './SpaceFeedItem';
import BaseRow from '../../components/Base/BaseRow';
import BaseText from '../../components/Base/BaseText';

export default function SpaceFeed({ spaces }: { spaces: ISpace[] }) {
	return (
		<BaseRow direction="column" spacing={1} rails="auto" style={{ padding: '1rem 5rem' }}>
			<BaseText variant="heading" fontWeight="bold" fontSize="xl" alignment="center">
				Explore
			</BaseText>
			{spaces.map((space) => (
				<SpaceFeedItem space={space} key={space.id} />
			))}
		</BaseRow>
	);
}
