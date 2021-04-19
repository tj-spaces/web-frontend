import {Record} from 'immutable';
import {VoiceServerLike} from '../../media/VoiceServer';
import LocalDevicesSDK, {LocalDevicesState} from './LocalDevicesSDK';

export type SpaceMediaStateProps = {
	localDevices: LocalDevicesState;
	localDevicesSDK: LocalDevicesSDK;
	voiceServer: VoiceServerLike | null;
	audioContext: AudioContext | null;
};
export default class SpaceMediaState extends Record<SpaceMediaStateProps>({
	localDevices: new LocalDevicesState(),
	localDevicesSDK: new LocalDevicesSDK(),
	voiceServer: null,
	audioContext: null,
}) {
	setVoiceServer(server: VoiceServerLike | null) {
		return this.set('voiceServer', server);
	}
	setAudioContext(context: AudioContext | null) {
		return this.set('audioContext', context);
	}
}
