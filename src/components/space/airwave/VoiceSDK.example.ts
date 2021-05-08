/** Here are some examples of how to use the VoiceSDK */

import getUserMedia from '../../../lib/getUserMedia';
import VoiceSDK from './VoiceSDK';

const sdk = new VoiceSDK();

/**
 * This method gets the user media and starts sending it to the voice upstream
 *
 *
 */
// eslint-disable-next-line
async function sendLocalMedia() {
	sdk.setVoiceUpstreamUrl('0.voice.joinnebula.co');

	const userMedia = await getUserMedia({audio: true, video: true});

	userMedia.forEach((track) => sdk.addLocalUserTrack(track));
}

// eslint-disable-next-line
function getDownstreamUrlForStream(_streamID: string) {
	return '0.voice.joinnebula.co';
}

// eslint-disable-next-line
function subscribeToScreen(userID: string) {
	const streamID = `${userID}:screen`;

	sdk.subscribe(streamID, {video: true});

	// You can associate a user with a downstream after requesting their media!

	const streamDownstreamUrl = getDownstreamUrlForStream(streamID);

	sdk.associateStreamWithDownstream(streamID, streamDownstreamUrl);
}

export {};
