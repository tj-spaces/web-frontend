import {Record} from 'immutable';
import VoiceEndpoint from './VoiceEndpoint';

export type SpaceMediaStateProps = {
	voiceServer: VoiceEndpoint | null;
	audioContext: AudioContext | null;
};
export default class SpaceMediaState extends Record<SpaceMediaStateProps>({
	voiceServer: null,
	audioContext: null,
}) {
	setVoiceServer(server: VoiceEndpoint | null) {
		return this.set('voiceServer', server);
	}
	setAudioContext(context: AudioContext | null) {
		return this.set('audioContext', context);
	}
}
