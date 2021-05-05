import {USE_VOICE_SERVER_SSL} from './constants';

export default function createVoiceEndpointURL(url: string) {
	const wssRegex = /^wss?:\/\//;
	if (!wssRegex.test(url)) {
		return (USE_VOICE_SERVER_SSL ? 'wss://' : 'ws://') + url;
	}
	return url;
}
