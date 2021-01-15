import { useState } from 'react';
import useMySpaces from '../../hooks/useMySpaces';
import SpaceSidebar from '../SpaceSidebar/SpaceSidebar';

export default function SpaceContainer() {
	const [activeSpace, setActiveSpace] = useState<number>();
	const mySpaces = useMySpaces();

	return (
		<SpaceSidebar spaces={mySpaces ?? []} setActiveSpace={setActiveSpace} activeSpace={activeSpace}></SpaceSidebar>
	);
}
