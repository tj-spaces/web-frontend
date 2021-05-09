import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {gamenight} from './Event.mocks';
import EventSchedule from './EventSchedule';

export default function EventExperienceRoot({eventID}: {eventID: string}) {
	const event = gamenight;

	return (
		<BaseRow direction="column" spacing={1} width="100%" alignment="center">
			<BaseText variant="primary-title">{event.title}</BaseText>
			<EventSchedule schedule={event.schedule} />
		</BaseRow>
	);
}
