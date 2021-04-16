// Check if it's possible to getUserMedia. This will be undefined if it's not possible
const getUserMedia =
	navigator.getUserMedia?.bind(navigator) ||
	navigator.mediaDevices.getUserMedia?.bind(navigator.mediaDevices);

export default getUserMedia;
