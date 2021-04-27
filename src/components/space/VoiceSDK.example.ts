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

function requestUserScreen(userID: string) {
	sdk.sendSubscribeRequest(userID, 'screenVideo');

	// You can associate a user with a downstream after requesting their media!

	const userDownstreamUrl = getDownstreamUrlForUser(userID);

	sdk.associateUserWithDownstream(userID, userDownstreamUrl);
}

export {};
