import {useEffect, useState} from 'react';
import SDKBase from '../lib/SDKBase';

export default function useSDKState<S>(sdk: SDKBase<S>) {
	const [state, setState] = useState<S>(sdk.getInitialState());

	useEffect(() => {
		const handle = sdk.addListener(setState);
		return () => handle.remove();
	}, [sdk]);

	return state;
}
