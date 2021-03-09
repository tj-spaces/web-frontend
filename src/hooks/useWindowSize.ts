/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useState} from 'react';
import useGlobalEventListener from './useGlobalEventListener';

function getCurrentValue() {
	return {
		innerHeight: window.innerHeight,
		innerWidth: window.innerWidth,
		outerHeight: window.outerHeight,
		outerWidth: window.outerWidth,
	};
}

export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState(getCurrentValue());

	useGlobalEventListener('resize', () => setWindowSize(getCurrentValue()));

	return windowSize;
}
