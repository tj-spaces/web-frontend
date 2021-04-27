import {Record} from 'immutable';

export type SpaceMediaStateProps = {
	audioContext: AudioContext | null;
};
export default class SpaceMediaState extends Record<SpaceMediaStateProps>({
	audioContext: null,
}) {
	setAudioContext(context: AudioContext | null) {
		return this.set('audioContext', context);
	}
}
