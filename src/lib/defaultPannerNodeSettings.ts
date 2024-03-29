/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
export const defaultPannerNodeSettings: PannerOptions = {
	panningModel: 'HRTF', // takes into account the human head
	distanceModel: 'exponential', // simplest way for sound to get quieter
	coneInnerAngle: 60,
	coneOuterAngle: 90,
	coneOuterGain: 0.3,
	maxDistance: 10000, // Arbitrary units
	refDistance: 1,
	rolloffFactor: 2, // How quickly the sound gets quieter
};
