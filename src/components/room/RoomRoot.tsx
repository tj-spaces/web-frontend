import VoiceProvider from '@airwave/VoiceProvider';
import UserSettingsProvider from '@components/space/userSettings/UserSettingsProvider';
import {useParams} from 'react-router';
import Room from './Room';
import RoomProvider from './RoomProvider';

export default function RoomRoot() {
	const {roomID} = useParams<{roomID: string}>();

	return (
		<UserSettingsProvider>
			<VoiceProvider voiceURL="localhost">
				<RoomProvider>
					<Room id={roomID} />
				</RoomProvider>
			</VoiceProvider>
		</UserSettingsProvider>
	);
}
