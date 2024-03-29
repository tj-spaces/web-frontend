/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
const regex = /-(.)/g;

export default function camelize(string: string): string {
	return string.replace(regex, (a, b) => b.toUpperCase());
}
