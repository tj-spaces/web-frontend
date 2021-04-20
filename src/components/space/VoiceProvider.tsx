import {useEffect, useMemo, useState} from 'react';
import {useCurrentUser} from '../AuthHooks';
import {useLocalTracks, useUserMediaStream} from './LocalDevicesHooks';
import VoiceContext from './VoiceContext';
import VoiceSDK from './VoiceSDK';
import VoiceState from './VoiceState';

export default function VoiceProvider({
	children,
	spaceID,
	voiceURL,
}: {
	children: React.ReactNode;
	spaceID: string;
	voiceURL?: string;
}) {
	const voiceSDK = useMemo(() => new VoiceSDK(), []);
	const [voiceState, setVoiceState] = useState(new VoiceState());
	const user = useCurrentUser();

	// Listen to changes to the voice state from the SDK
	useEffect(() => {
		const handle = voiceSDK.addListener(setVoiceState);
		return () => handle.remove();
	}, [voiceSDK]);

	useEffect(() => {
		if (voiceURL) {
			voiceSDK.addVoiceEndpoint(voiceURL);
			return () => voiceSDK.removeVoiceEndpoint(voiceURL);
		}
	}, [voiceSDK, voiceURL]);

	useEffect(() => {
		if (user) {
			voiceSDK.joinSpace(spaceID, user.id);
			return () => {
				voiceSDK.leaveSpace(spaceID);
			};
		}
	}, [voiceSDK, spaceID, user]);

	const tracks = useLocalTracks();
	const userMediaStream = useUserMediaStream();

	useEffect(() => {
		if (userMediaStream) {
			tracks.forEach((track) => {
				voiceSDK.addLocalTrack(track, userMediaStream);
			});
			return () => {
				tracks.forEach((track) => {
					voiceSDK.removeLocalTrack(track);
				});
			};
		}
	}, [tracks, userMediaStream, voiceSDK]);

	// TODO: add adding/removing local tracks
	// TODO: add joining room

	return (
		<VoiceContext.Provider value={{voiceState, voiceSDK}}>
			{children}
		</VoiceContext.Provider>
	);
}
