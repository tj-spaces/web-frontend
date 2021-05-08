export default function formatMessage(messageFormat: string, ...params: any[]) {
	let paramIndex = -1;
	return messageFormat.replace(/%[po]/g, (substring) => {
		paramIndex++;

		let param = params[paramIndex];

		if (substring === '%p') {
			return String(param);
		} else if (substring === '%o') {
			return JSON.stringify(param);
		} else {
			console.warn('Invalid message format:', messageFormat);
			return String(param);
		}
	});
}
