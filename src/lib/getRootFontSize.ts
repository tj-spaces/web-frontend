/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
export default function getRootFontSize() {
	const sizeString = window
		.getComputedStyle(document.body)
		.getPropertyValue('font-size');
	const sizeDigits = sizeString.slice(0, sizeString.length - 2);
	return parseInt(sizeDigits);
}
