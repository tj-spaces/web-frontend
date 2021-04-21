import {useEffect, useMemo} from 'react';
import useSDKState from '../../hooks/useSDKState';
import {useCurrentUser} from '../AuthHooks';
import {useLocalTracks, useUserMediaStream} from './LocalDevicesHooks';
import RTCUser from './RTCUser';
import {useParticipants} from './SimulationHooks';
import VoiceContext from './VoiceContext';
import VoiceSDK from './VoiceSDK';

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
	const user = useCurrentUser();

	const voiceState = useSDKState(voiceSDK);

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

	const spaceParticipants = useParticipants();

	useEffect(() => {
		spaceParticipants.forEach((participant, id) => {
			if (!voiceSDK.hasUser(id)) {
				voiceSDK.addUser(new RTCUser({id}));
			}
		});

		voiceState.rtcUsers.forEach((_, id) => {
			if (!spaceParticipants.has(id)) {
				voiceSDK.removeUser(id);
			}
		});
	}, [spaceParticipants, voiceSDK, voiceState]);

	return (
		<VoiceContext.Provider value={{voiceState, voiceSDK}}>
			{children}
		</VoiceContext.Provider>
	);
}
