export type LogSeverity = 'debug' | 'log' | 'info' | 'warn' | 'error';
export type LogCategory =
	| 'performance'
	| 'space'
	| 'space/connection'
	| 'space/media'
	| 'space/participant-bubble'
	| 'space/2d/local-participant'
	| 'space/2d/remote-participant'
	| 'space/3d/local-participant'
	| 'space/3d/remote-participant'
	| 'stylesheet';

function base(category: string, message: any, severity: LogSeverity = 'info') {
	console[severity](`[${category}] [${severity}]`, message);
}

export function getLogger(category: LogCategory) {
	return base.bind(null, category);
}
