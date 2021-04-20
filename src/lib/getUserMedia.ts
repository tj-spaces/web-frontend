// Check if it's possible to getUserMedia. This will be undefined if it's not possible
const nativeGetUserMedia =
	navigator.getUserMedia?.bind(navigator) ||
	navigator.mediaDevices.getUserMedia?.bind(navigator.mediaDevices);

function getUserMedia(constraints: MediaStreamConstraints) {
	return new Promise<MediaStream>((resolve, reject) =>
		nativeGetUserMedia(constraints, resolve, reject)
	);
}

export default getUserMedia;
