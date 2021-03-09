/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
export class APIError extends Error {
	constructor(route: string, message: string) {
		super('API Error @' + route + ': ' + message);
	}
}
