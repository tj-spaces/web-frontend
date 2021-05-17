import {useEffect, useState} from 'react';
import {IHookableRecord} from './HookableRecord';

export default function useRecordKey<
	T extends Record<string, unknown>,
	K extends keyof T
>(record: IHookableRecord<T>, key: K): [T[K], (newValue: T[K]) => void] {
	const [value, setValue] = useState(record[key]);

	useEffect(() => {
		return () =>
			record
				// @ts-expect-error
				.on(key, (value) => {
					setValue(value);
				})
				.remove();
	}, [key, record]);

	return [
		value,
		(v) => {
			// @ts-expect-error
			record[key] = v;
		},
	];
}
