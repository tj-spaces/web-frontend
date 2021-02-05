export default function toReadableMessage(message: string, params: string[]) {
	let paramIndex = 0;
	message = message.replace(/%s/g, () => {
		return paramIndex < params.length ? params[paramIndex++] : 'NOPARAM';
	});
	if (paramIndex < params.length) message += ' PARAMS' + JSON.stringify(params.slice(paramIndex));
	return message;
}
