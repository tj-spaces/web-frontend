export default function getRootFontSize() {
	const sizeString = window.getComputedStyle(document.body).getPropertyValue('font-size');
	const sizeDigits = sizeString.slice(0, sizeString.length - 2);
	return parseInt(sizeDigits);
}
