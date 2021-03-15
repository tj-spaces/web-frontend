import {makeAPIPostCall} from './utils';

export async function reportError(error: any) {
	let data;

	if (error instanceof Error) {
		data = {
			name: error.name,
			message: error.message,
			stack: error.stack,
			time: new Date().getTime(),
		};
	} else {
		data = {
			name: 'unknown',
			message: error,
			stack: '',
			time: new Date().getTime(),
		};
	}

	return makeAPIPostCall('/analytics/error', {error: data});
}
