import BaseText from '../../components/base/BaseText';
import FeedContainer from '../../components/feed/FeedContainer';

export default function ExploreTab() {
	return (
		<>
			<BaseText variant="primary-title" alignment="center">
				Explore
			</BaseText>
			<FeedContainer />
		</>
	);
}
