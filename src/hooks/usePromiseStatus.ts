/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useEffect, useState} from 'react';
import {reportError} from '../api/analytics';

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
	factory: () => Promise<T>
): PromiseStatus<T> {
	let [status, setStatus] = useState<null | 'loading' | 'loaded' | 'errored'>(
		null
	);
	let [value, setValue] = useState<T | null>(null);

	useEffect(() => {
		setStatus('loading');
		factory()
			.then((value) => {
				setValue(value);
				setStatus('loaded');
			})
			.catch((error) => {
				reportError(error);
				setStatus('errored');
			});
	}, [factory]);

	// @ts-expect-error
	return {status, value};
}
