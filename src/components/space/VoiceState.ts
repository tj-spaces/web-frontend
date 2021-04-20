import {Record, Map} from 'immutable';
import {VoiceServerLike} from '../../media/VoiceEndpoint';

export type VoiceStateProps = {
	voiceEndpoints: Map<string, VoiceServerLike>;
};

export class VoiceState extends Record<VoiceStateProps>({
	voiceEndpoints: Map({}),
}) {
	addVoiceEndpoint(endpointId: string, endpoint: VoiceServerLike) {
		return this.set(
			'voiceEndpoints',
			this.voiceEndpoints.set(endpointId, endpoint)
		);
	}

	removeVoiceEndpoint(endpointId: string) {
		return this.set('voiceEndpoints', this.voiceEndpoints.delete(endpointId));
	}
}
