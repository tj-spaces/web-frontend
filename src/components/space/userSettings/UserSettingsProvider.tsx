import React, {useMemo} from 'react';
import useSDKState from '../../../hooks/useSDKState';
import UserSettingsContext from './UserSettingsContext';
import UserSettingsSDK from './UserSettingsSDK';

export default function UserSettingsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const sdk = useMemo(() => new UserSettingsSDK(), []);
	const state = useSDKState(sdk);

	return (
		<UserSettingsContext.Provider
			value={{userSettings: state, userSettingsSDK: sdk}}
		>
			{children}
		</UserSettingsContext.Provider>
	);
}
