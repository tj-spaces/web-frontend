import formatMessage from '../../lib/formatMessage';

class AirwaveLogger {
	mustfix(messageFormat: string, ...params: any[]) {
		console.error(formatMessage(messageFormat, ...params));
	}
	error(messageFormat: string, ...params: any[]) {
		console.error(formatMessage(messageFormat, ...params));
	}
	info(messageFormat: string, ...params: any[]) {
		console.log(formatMessage(messageFormat, ...params));
	}
	debug(messageFormat: string, ...params: any[]) {
		console.log(formatMessage(messageFormat, ...params));
	}
	checkpoint(checkpoint: string, messageFormat?: string, ...params: any[]) {
		if (!messageFormat) {
			console.log('Reached checkpoint', checkpoint);
		} else {
			console.log(
				`Reached checkpoint ${checkpoint}:`,
				formatMessage(messageFormat, ...params)
			);
		}
	}
}

const AirwaveLoggerGlobal = new AirwaveLogger();

export default AirwaveLoggerGlobal;
