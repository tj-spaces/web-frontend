export const defaultPannerNodeSettings: PannerOptions = {
	panningModel: 'HRTF', // takes into account the human head
	distanceModel: 'linear', // simplest way for sound to get quieter
	coneInnerAngle: 60,
	coneOuterAngle: 90,
	coneOuterGain: 0.3,
	maxDistance: 10000, // Arbitrary units
	refDistance: 1,
	rolloffFactor: 2 // How quickly the sound gets quieter
};