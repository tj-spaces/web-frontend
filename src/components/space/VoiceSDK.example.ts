/** Here are some examples of how to use the VoiceSDK */

import getUserMedia from '../../lib/getUserMedia';
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
	userMedia.forEach((track) => sdk.addLocalTrack(track, 'user'));
}

// eslint-disable-next-line
function getDownstreamUrlForUser(_userID: string) {
	return '0.voice.joinnebula.co';
}

// eslint-disable-next-line
function requestUserScreen(userID: string) {
	sdk.subscribe(`${userID}:screen`, {video: true});

	// You can associate a user with a downstream after requesting their media!

	const userDownstreamUrl = getDownstreamUrlForUser(userID);

	sdk.associateStreamWithDownstream(userID, userDownstreamUrl);
}

export {};
