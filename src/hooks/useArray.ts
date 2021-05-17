import {useState} from 'react';

function useArray<T>(initialValue?: T[]) {
	const [array, setArray] = useState(initialValue ?? []);

	return {
		get(n: number) {
			return array[n];
		},
		set(n: number, value: T) {
			setArray((array) => [...array.slice(0, n), value, ...array.slice(n + 1)]);
		},
		push(value: T) {
			setArray((array) => [...array, value]);
		},
		pop() {
			const value = array[array.length - 1];
			setArray(array.slice(0, array.length - 1));
			return value;
		},
		slice(start?: number, end?: number) {
			return array.slice(start, end);
		},
		forEach(fn: (value: T, index: number, array: T[]) => void, thisArg?: any) {
			array.forEach(fn, thisArg);
		},
		map<U>(fn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
			return array.map(fn, thisArg);
		},
	};
}

export default useArray;
