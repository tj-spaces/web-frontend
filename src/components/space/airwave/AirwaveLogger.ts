import formatMessage from '../../../lib/formatMessage';

class AirwaveLogger {
	mustfix(messageFormat: string, ...params: any[]) {
		console.error('[AW]', formatMessage(messageFormat, ...params));
	}
	error(messageFormat: string, ...params: any[]) {
		console.error('[AW]', formatMessage(messageFormat, ...params));
	}
	warn(messageFormat: string, ...params: any[]) {
		console.warn('[AW]', formatMessage(messageFormat, ...params));
	}
	info(messageFormat: string, ...params: any[]) {
		console.log('[AW]', formatMessage(messageFormat, ...params));
	}
	debug(messageFormat: string, ...params: any[]) {
		console.log('[AW]', formatMessage(messageFormat, ...params));
	}
	checkpoint(checkpoint: string, messageFormat?: string, ...params: any[]) {
		if (!messageFormat) {
			console.log('[AW] Reached checkpoint', checkpoint);
		} else {
			console.log(
				`[AW] Reached checkpoint ${checkpoint}:`,
				formatMessage(messageFormat, ...params)
			);
		}
	}
}

const AirwaveLoggerGlobal = new AirwaveLogger();

export default AirwaveLoggerGlobal;
