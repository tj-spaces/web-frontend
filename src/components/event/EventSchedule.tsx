import BaseRow from '../base/BaseRow';
import EventScheduleItem from './EventScheduleItem';

export type IEventScheduleItem = {
	/**
	 * This ID must be unique to the event, but will not be globally unique.
	 */
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	active: boolean;
	url?: string;
	description?: string;
};

export type IEvent = {
	title: string;
	schedule: IEventScheduleItem[];
};

type Props = {
	schedule: IEvent['schedule'];
};

export default function EventSchedule({schedule}: Props) {
	return (
		<BaseRow direction="column" spacing={1}>
			{schedule.map((item) => (
				<EventScheduleItem key={item.id} active={false} item={item} />
			))}
		</BaseRow>
	);
}
