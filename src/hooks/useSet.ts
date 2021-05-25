import {useState} from 'react';
import {Set} from 'immutable';

function useSet<T>(initialValue?: Iterable<T>) {
	const [set, setSet] = useState(initialValue ? Set(initialValue) : Set());

	return {
		add(item: T) {
			setSet((set) => set.add(item));
		},
		has(item: T) {
			return set.has(item);
		},
		delete(item: T) {
			setSet((set) => set.delete(item));
		},
		clear() {
			setSet(Set());
		},
		values() {
			return set.values();
		},
		keys() {
			return set.keys();
		},
		get size() {
			return set.size;
		},
	};
}

export default useSet;
