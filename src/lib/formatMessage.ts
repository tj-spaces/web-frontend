export default function formatMessage(messageFormat: string, ...params: any[]) {
	let paramIndex = -1;
	return messageFormat.replace('%p', () => {
		paramIndex++;

		let param = params[paramIndex];

		if (typeof param === 'string' || typeof param === 'number') {
			return String(param);
		}

		let stringified = String(param);
		if (stringified === '[object Object]') {
			stringified = JSON.stringify(param);
		}

		return String(stringified);
	});
}
