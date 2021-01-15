import { ISpace } from '../../typings/Space';
import SpaceSidebarCreateSpace from '../SpaceSidebarCreateSpaceButton/SpaceSidebarCreateSpaceButton';
import SpaceSidebarSelector from '../SpaceSidebarSelector/SpaceSidebarSelector';

export default function SpaceSidebar({
	spaces,
	activeSpace,
	setActiveSpace
}: {
	spaces: ISpace[];
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
