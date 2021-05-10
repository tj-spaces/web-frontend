import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {IEventScheduleItem} from './EventSchedule';

type Props = {
	item: IEventScheduleItem;
	active: boolean;
};

export default function EventScheduleItem({item}: Props) {
	return (
		<BaseRow
			direction="column"
			backgroundColor="bgElevated"
			edges={1}
			rails={2}
			width="100%"
			borderRadius={0.5}
		>
			<BaseText variant="list-item-title">{item.title}</BaseText>
			<BaseText variant="caption">
				{item.startTime} - {item.endTime}
			</BaseText>
			{item.description && (
				<BaseText variant="body" marginTop={1} marginBottom={1}>
					{item.description}
				</BaseText>
			)}
			{item.url && (
				<a
					href={item.url}
					style={{textDecoration: 'underline'}}
					target="_blank"
					rel="noreferrer"
				>
					{item.url}
				</a>
			)}
		</BaseRow>
	);
}
