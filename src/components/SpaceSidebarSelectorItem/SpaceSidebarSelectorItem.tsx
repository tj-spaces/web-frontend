import { ICluster } from '../../typings/Cluster';

export default function SpaceSidebarSelectorItem({
	space,
	isActive,
	setActiveSpace
}: {
	space: ICluster;
	isActive: boolean;
	setActiveSpace: (spaceId: number) => any;
}) {
	return (
		<div
			style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
			onClick={() => setActiveSpace(space.id)}
		>
			{isActive ? <b>{space.name}</b> : space.name}
		</div>
	);
}
