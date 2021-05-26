import VoiceProvider from '@airwave/VoiceProvider';
import BaseButton from '@components/base/BaseButton';
import UserSettingsProvider from '@components/space/userSettings/UserSettingsProvider';
import {useState} from 'react';
import {useParams} from 'react-router';
import {createStylesheet} from 'src/styles/createStylesheet';
import RoomControl from './RoomControl';
import RoomPresence from './RoomPresence';
import useRoom from './useRoom';

const styles = createStylesheet({
	room: {
		marginLeft: '2rem',
		marginRight: '2rem',
		minWidth: '20rem',
	},
});

export default function Room() {
	const {roomID} = useParams<{roomID: string}>();
	const room = useRoom(roomID);
	const [leftRoom, setLeftRoom] = useState(false);

	return (
		<UserSettingsProvider>
			<VoiceProvider voiceURL="localhost">
				<div className={styles('room')}>
					{leftRoom ? (
						<>
							<h1>You left the room</h1>
							<BaseButton variant="theme" onClick={() => setLeftRoom(false)}>
								Rejoin
							</BaseButton>
						</>
					) : (
						<>
							<h1>Room {roomID}</h1>
							<RoomControl leaveRoom={() => setLeftRoom(true)} />
							{room.participants.map((username) => (
								<RoomPresence key={username} username={username} />
							))}
						</>
					)}
				</div>
			</VoiceProvider>
		</UserSettingsProvider>
	);
}
