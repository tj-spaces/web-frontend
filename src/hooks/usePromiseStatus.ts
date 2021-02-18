import {useEffect, useState} from 'react';

export type NullStatus = {
	status: null;
	value: null;
};

export type LoadingStatus = {
	status: 'loading';
	value: null;
};

export type LoadedStatus<T> = {
	status: 'loaded';
	value: T;
};

export type ErroredStatus = {
	status: 'errored';
	value: null;
};

export type PromiseStatus<T> =
	| NullStatus
	| LoadingStatus
	| LoadedStatus<T>
	| ErroredStatus;

export default function usePromiseStatus<T>(
	promise: Promise<T>
): PromiseStatus<T> {
	let [status, setStatus] = useState<null | 'loading' | 'loaded' | 'errored'>(
		null
	);
	let [value, setValue] = useState<T | null>(null);

	useEffect(() => {
		setStatus('loading');
		promise
			.then((value) => {
				setValue(value);
				setStatus('loaded');
			})
			.catch(() => {
				setStatus('errored');
			});
	}, [promise]);

	// @ts-expect-error
	return {status, value};
}
