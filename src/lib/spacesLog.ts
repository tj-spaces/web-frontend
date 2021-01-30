export default function spacesLog(category: string, message: any, severity: string = 'debug') {
	console.log(`[${category}] [${severity}]`, message);
}
