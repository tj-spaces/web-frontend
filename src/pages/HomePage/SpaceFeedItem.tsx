import { ISpace } from '../../typings/Space';
import BaseCard from '../../components/Base/BaseCard';
import BaseText from '../../components/Base/BaseText';

export default function SpaceFeedItem({ space }: { space: ISpace }) {
	return (
		<BaseCard backgroundColor="dark" style={{ minWidth: '250px' }}>
			<BaseText fontSize="large">{space.name}</BaseText>
			Online: {space.online_count}
		</BaseCard>
	);
}
