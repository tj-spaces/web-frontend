import React, {useState} from 'react';
import SpaceMediaState from './SpaceMediaState';
import SpaceMediaStateContext from './SpaceMediaStateContext';

export default function SpaceMediaStateProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mediaState, setMediaState] = useState(new SpaceMediaState());

	return (
		<SpaceMediaStateContext.Provider value={mediaState}>
			{children}
		</SpaceMediaStateContext.Provider>
	);
}
