import {useParams} from 'react-router';
import EventExperienceRoot from '../components/event/EventExperienceRoot';

export default function EventExperiencePage() {
	const {eventID} = useParams<{eventID: string}>();

	return <EventExperienceRoot eventID={eventID} />;
}
