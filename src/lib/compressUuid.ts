// Changes from a string like "d6a89c1e-219e-45a3-bc05-662ccab87645" to a shorter, base-36 string
export function compressUuid(uuid: string) {
	return uuid
		.split('-')
		.map((part) => parseInt(part, 16).toString(36))
		.join('-');
}

// Changes a base-36 string to a hex string [8, 4, 4, 4, 12]
export function decompressUuid(compressed: string) {
	let sizes = [8, 4, 4, 4, 12];

	return compressed
		.split('-')
		.map((digits, index) => {
			let size = sizes[index];
			let unpaddedHexString = parseInt(digits, 36).toString(16);
			return unpaddedHexString.padStart(size, '0');
		})
		.join('-');
}
