import {useContext, useEffect, useState} from 'react';
import {VoiceServer} from '../../media/VoiceServer';
import AuthContext from '../AuthContext';

export type VoiceChannelParticipant = {
	displayName: string;
};

export type VoiceChannelParticipants = Record<string, VoiceChannelParticipant>;

/**
 * A VoiceChannel is just a regular voice call.
 */
export default function VoiceChannel({channelID}: {channelID: string}) {
	// const [participants, setParticipants] = useState<VoiceChannelParticipants>(
	// 	{}
	// );
	const {user} = useContext(AuthContext);
	const [, setVoiceServer] = useState<VoiceServer>();

	// Set up the VoiceServer connection
	useEffect(() => {
		if (user) {
			let server = new VoiceServer('localhost', user.id);
			setVoiceServer(server);

			navigator.mediaDevices.getUserMedia({audio: true}).then((mediastream) => {
				mediastream
					.getTracks()
					.forEach((track) => server.addLocalTrack(track, mediastream));
			});

			return () => server.disconnect();
		}
	}, [user]);

	return (
		<div
			style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
		>
			<h1>Voice Channel</h1>
			<b>Channel ID: {channelID}</b>
		</div>
	);
}
