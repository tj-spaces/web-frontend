const regex = /([A-Z])/g;

export default function hyphenate(string: string) {
	return string.replace(regex, '-$1').toLowerCase();
}
