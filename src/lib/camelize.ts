const regex = /-(.)/g;

export default function camelize(string: string): string {
	return string.replace(regex, (a, b) => b.toUpperCase());
}
