import VoiceContext from '@airwave/VoiceContext';
import {useContext, useEffect} from 'react';

type Props = {
	username: string;
};

export default function RoomPresence({username}: Props) {
	const {voiceSDK} = useContext(VoiceContext);

	useEffect(() => {
		voiceSDK.associateStreamWithDownstream(
			`user$${username}:user`,
			'localhost'
		);

		return () => {
			voiceSDK.disassociateStreamFromDownstream(
				`user$${username}:user`,
				'localhost'
			);
		};
	}, [username, voiceSDK]);

	return <div>user {username}</div>;
}
