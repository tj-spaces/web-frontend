/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
const regex = /([A-Z])/g;

export default function hyphenate(string: string) {
	return string.replace(regex, '-$1').toLowerCase();
}
