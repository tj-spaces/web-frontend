/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {ITopicTag} from '../../typings/Types';
import BaseRow from '../base/BaseRow';
import TopicTag from './TopicTag';

export default function TopicTagList({
	tags,
	onSelect,
}: {
	tags: ITopicTag[];
	onSelect: (id: string) => void;
}) {
	return (
		<BaseRow direction="row" rails={1} spacing={0.5}>
			{tags.map((tag) => (
				<TopicTag key={tag.id} onClick={() => onSelect(tag.id)}>
					{tag.display}
				</TopicTag>
			))}
		</BaseRow>
	);
}
