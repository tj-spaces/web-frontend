import VoiceProvider from '@airwave/VoiceProvider';
import {useParams} from 'react-router';
import useInterval from 'src/hooks/useInterval';
import useSet from 'src/hooks/useSet';
import RoomPresence from './RoomPresence';

export default function Room() {
	const {roomID} = useParams<{roomID: string}>();
	const users = useSet<string>();

	useInterval(() => {
		users.add('hello' + new Date().getTime());
		console.log('adding hello');
	}, 1000);

	return (
		<VoiceProvider voiceURL="localhost">
			<h1>Room {roomID}</h1>
			{users.map((username) => (
				<RoomPresence key={username} username={username} />
			))}
		</VoiceProvider>
	);
}
