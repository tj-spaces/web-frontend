import BaseText from '../components/base/BaseText';
import FeedContainer from '../components/feed/FeedContainer';
import TopicTagList from '../components/TopicTagList';

export default function ExploreTab() {
	return (
		<>
			<BaseText variant="caption">Trending Topics</BaseText>
			<TopicTagList
				tags={[
					{
						id: 'yo',
						display: 'yooooo',
					},
					{
						id: 'hey',
						display: 'whats-popping',
					},
					{
						id: 'chill',
						display: 'chill',
					},
					{
						id: 'gaming',
						display: 'gaming',
					},
				]}
				onSelect={(id) => console.log('Selected tag', id)}
			/>
			<FeedContainer />
		</>
	);
}
