/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {AssertionError} from 'assert';

export type LogSeverity = 'debug' | 'log' | 'info' | 'warn' | 'error';
export type LogCategory =
	| 'performance'
	| 'space'
	| 'space/participants'
	| 'space/connection'
	| 'space/media'
	| 'space/wrapper'
	| 'space/participant-bubble'
	| 'space/simulation'
	| 'space/spatial-audio'
	| 'loader/incoming-friend-requests'
	| 'loader/model-loader'
	| 'api'
	| 'stylesheet';

function base(category: string, message: any, severity: LogSeverity = 'info') {
	console[severity](`[${category}] [${severity}]`, message);
}

export function getLogger(category: LogCategory) {
	return {
		info(message: any) {
			base(category, message, 'info');
		},
		debug(message: any) {
			base(category, message, 'debug');
		},
		error(message: any) {
			base(category, message, 'error');
		},
		warn(message: any) {
			base(category, message, 'warn');
		},
		assert(condition: any, onFailureMessage: string) {
			if (!condition) {
				base(category, onFailureMessage, 'error');
				throw new AssertionError({message: onFailureMessage});
			}
		},
	};
}
