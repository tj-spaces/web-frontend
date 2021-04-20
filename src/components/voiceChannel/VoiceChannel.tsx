export {};

// import {useContext, useEffect, useState} from 'react';
// import AuthContext from '../AuthContext';
// import VoiceEndpoint from '../space/VoiceEndpoint';

// export type VoiceChannelParticipant = {
// 	displayName: string;
// };

// export type VoiceChannelParticipants = Record<string, VoiceChannelParticipant>;

// /**
//  * A VoiceChannel is just a regular voice call.
//  */
// export default function VoiceChannel({channelID}: {channelID: string}) {
// 	// const [participants, setParticipants] = useState<VoiceChannelParticipants>(
// 	// 	{}
// 	// );
// 	// const {user} = useContext(AuthContext);
// 	// const [, setVoiceServer] = useState<VoiceEndpoint>();

// 	// Set up the VoiceServer connection
// 	// useEffect(() => {
// 	// 	if (user) {
// 	// 		let server = new VoiceEndpoint('localhost', user.id);
// 	// 		setVoiceServer(server);

// 	// 		navigator.mediaDevices.getUserMedia({audio: true}).then((mediastream) => {
// 	// 			mediastream
// 	// 				.getTracks()
// 	// 				.forEach((track) => server.addLocalTrack(track, mediastream));
// 	// 		});

// 	// 		return () => server.disconnect();
// 	// 	}
// 	// }, [user]);

// 	return (
// 		<div
// 			style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
// 		>
// 			<h1>Voice Channel</h1>
// 			<b>Channel ID: {channelID}</b>
// 		</div>
// 	);
// }
