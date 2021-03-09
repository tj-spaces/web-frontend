/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseText from '../components/base/BaseText';
import FeedContainer from '../components/feed/FeedContainer';
import TopicTagList from '../components/topicTags/TopicTagList';

export default function ExploreTab() {
	return (
		<>
			<BaseText variant="caption">Trending Topics</BaseText>
			<TopicTagList
				tags={[
					{id: 'yo', display: 'yooooo'},
					{id: 'hey', display: 'whats-popping'},
					{id: 'chill', display: 'chill'},
					{id: 'gaming', display: 'gaming'},
				]}
				onSelect={(id) => console.log('Selected tag', id)}
			/>
			<FeedContainer />
		</>
	);
}
