export function createUrlWithGetParameters(url: string, params?: Record<string, string | undefined>) {
	if (params) {
		// Stringify the parameters
		let stringifiedParameters = '';
		for (let [name, value] of Object.entries(params)) {
			if (value) {
				stringifiedParameters += encodeURIComponent(name) + '=' + encodeURIComponent(value);
			}
		}
		if (stringifiedParameters) {
			url += '?' + stringifiedParameters;
		}
	}
	return url;
}
