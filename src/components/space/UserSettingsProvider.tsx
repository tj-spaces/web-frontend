import React, {useEffect, useMemo, useState} from 'react';
import UserSettingsContext from './UserSettingsContext';
import UserSettingsSDK from './UserSettingsSDK';
import UserSettingsState from './UserSettingsState';

export default function UserSettingsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const sdk = useMemo(() => new UserSettingsSDK(), []);
	const [state, setState] = useState(new UserSettingsState());

	useEffect(() => {
		let handle = sdk.addListener(setState);
		return () => handle.remove();
	}, [sdk]);

	return (
		<UserSettingsContext.Provider
			value={{userSettings: state, userSettingsSDK: sdk}}
		>
			{children}
		</UserSettingsContext.Provider>
	);
}
