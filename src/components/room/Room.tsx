import VoiceProvider from '@airwave/VoiceProvider';
import {useParams} from 'react-router';
import useSet from 'src/hooks/useSet';
import RoomPresence from './RoomPresence';

export default function Room() {
	const {roomID} = useParams<{roomID: string}>();
	const users = useSet<string>();

	return (
		<VoiceProvider voiceURL="localhost">
			<h1>Room {roomID}</h1>
			{users.map((username) => (
				<RoomPresence key={username} username={username} />
			))}
		</VoiceProvider>
	);
}
