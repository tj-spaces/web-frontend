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
	| 'space/2d/local-participant'
	| 'space/2d/remote-participant'
	| 'space/3d/local-participant'
	| 'space/3d/remote-participant'
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
