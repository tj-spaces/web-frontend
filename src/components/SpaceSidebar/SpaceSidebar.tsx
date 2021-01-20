import { ICluster } from '../../typings/Cluster';
import SpaceSidebarCreateSpace from '../SpaceSidebarCreateSpaceButton/SpaceSidebarCreateSpaceButton';
import SpaceSidebarSelector from '../SpaceSidebarSelector/SpaceSidebarSelector';

export default function SpaceSidebar({
	spaces,
	activeSpace,
	setActiveSpace
}: {
	spaces: ICluster[];
	activeSpace?: number;
	setActiveSpace: (spaceId: number) => any;
}) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<SpaceSidebarSelector spaces={spaces} activeSpace={activeSpace} setActiveSpace={setActiveSpace} />
			<SpaceSidebarCreateSpace />
		</div>
	);
}
