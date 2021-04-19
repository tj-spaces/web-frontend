import {Record} from 'immutable';
import closeUserMedia from '../../lib/rtc/closeUserMedia';
import {VoiceServerLike} from '../../media/VoiceServer';

export default class SpaceMediaState extends Record<{
	voiceServer: VoiceServerLike | null;
	localStream: MediaStream | null;
	cameraEnabled: boolean;
	micEnabled: boolean;
	audioContext: AudioContext | null;
}>({
	voiceServer: null,
	localStream: null,
	cameraEnabled: false,
	micEnabled: false,
	audioContext: null,
}) {
	setLocalStream(stream: MediaStream | null) {
		return this.set('localStream', stream);
	}
	setVoiceServer(server: VoiceServerLike | null) {
		return this.set('voiceServer', server);
	}
	setCameraEnabled(enabled: boolean) {
		return this.set('cameraEnabled', enabled);
	}
	setMicEnabled(enabled: boolean) {
		return this.set('micEnabled', enabled);
	}
	setAudioContext(context: AudioContext | null) {
		return this.set('audioContext', context);
	}
	closeLocalStream() {
		if (this.localStream) {
			closeUserMedia(this.localStream, {audio: true, video: true});
			return this.setLocalStream(null);
		}
		return this;
	}
}
