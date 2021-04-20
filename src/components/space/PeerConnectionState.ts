import {Map, Record} from 'immutable';

export type PeerConnectionStateProps = {
	mediaStreams: Map<string, MediaStream>;
};

export class PeerConnectionState extends Record<PeerConnectionStateProps>({
	mediaStreams: Map(),
}) {
	addMediastream(stream: MediaStream) {
		return this.mediaStreams.set(stream.id, stream);
	}
	deleteMediastreamById(id: string) {
		return this.mediaStreams.delete(id);
	}
	getMediaStream(id: string) {
		return this.mediaStreams.get(id);
	}
}
